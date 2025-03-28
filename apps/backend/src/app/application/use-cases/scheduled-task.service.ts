import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { RSS2NewsParser } from '../../infrastructure/external/rss2.parser';
import { GetProvidersUseCase } from './provider.use-case';
import { UpsertNewsUseCase } from './upsert-news.use-case';

@Injectable()
export class ScheduledTaskService {
  constructor(
    private getProvidersUseCase: GetProvidersUseCase,
    private readonly upsertNewsUseCase: UpsertNewsUseCase,
    private readonly rss2NewsParser: RSS2NewsParser,
  ) {}

  private readonly logger = new Logger(ScheduledTaskService.name);

  @Cron('*/20 * * * *') // Exécution toutes les 20 minutes
  async handleTask() {
    this.logger.log('⏱️ Running scheduled tasks now!');

    // Récupérer tous les providers
    const providers = await this.getProvidersUseCase.execute();

    for (const provider of providers) {
      this.logger.log(`Fetching news from ${provider.name}...`);
      try {
        // à abstraire avec une interface IParser
        const newsToAdd = await this.rss2NewsParser.fetchFrom(provider);
        // à insérer en une seule transaction
        for (const news of newsToAdd) {
          try {
            await this.upsertNewsUseCase.execute(news);
          } catch (error) {
            this.logger.error(
              `Error saving news from ${provider.name}:`,
              error,
            );
          }
        }
        this.logger.log(`${newsToAdd.length} news saved in DB.`);
      } catch (error) {
        this.logger.error(`Error fetching news from ${provider.name}:`, error);
      }
    }
  }
}
