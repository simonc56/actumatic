import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  private reconnecting: Promise<void> | null = null;

  constructor() {
    super();

    this.$use(async (params, next) => {
      try {
        return await next(params);
      } catch (error) {
        if (!this.isDatabaseUnavailableError(error)) {
          throw error;
        }

        this.logger.warn(
          'Database is temporarily unavailable. Retrying connection once before failing the query.',
        );

        await this.reconnectWithRetry(3, 1000);
        return next(params);
      }
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to database.');
    } catch (error) {
      this.logger.error(
        'Initial database connection failed. Starting in degraded mode and retrying in background.',
        error instanceof Error ? error.stack : undefined,
      );

      // Do not crash Nest startup when DB is down temporarily.
      void this.reconnectWithRetry();
    }
  }

  private async reconnectWithRetry(
    maxAttempts = 0,
    initialDelayMs = 2000,
  ): Promise<void> {
    if (this.reconnecting) {
      return this.reconnecting;
    }

    this.reconnecting = (async () => {
      let attempt = 0;

      while (maxAttempts === 0 || attempt < maxAttempts) {
        attempt += 1;

        try {
          await this.$disconnect().catch(() => undefined);
          await this.$connect();
          this.logger.log('Database connection restored.');
          return;
        } catch (error) {
          const delay = Math.min(initialDelayMs * 2 ** (attempt - 1), 30000);
          this.logger.warn(
            `Database reconnection attempt ${attempt} failed. Next retry in ${delay}ms.`,
          );

          if (maxAttempts !== 0 && attempt >= maxAttempts) {
            throw error;
          }

          await this.sleep(delay);
        }
      }
    })();

    try {
      await this.reconnecting;
    } finally {
      this.reconnecting = null;
    }
  }

  private isDatabaseUnavailableError(error: unknown): boolean {
    if (!(error instanceof Error)) {
      return false;
    }

    const message = error.message.toLowerCase();
    return (
      message.includes("can't reach database server") ||
      message.includes('p1001') ||
      message.includes('connection')
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
