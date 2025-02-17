import { Module } from '@nestjs/common';
import { NEWS_REPOSITORY } from '../application/ports/news-repository.port';
import { PROVIDER_REPOSITORY } from '../application/ports/provider-repository.port';
import { GetProvidersUseCase } from '../application/use-cases/provider.use-case';
import { ScheduledTaskService } from '../application/use-cases/scheduled-task.service';
import { UpsertNewsUseCase } from '../application/use-cases/upsert-news.use-case';
import { RSS2NewsParser } from '../infrastructure/external/rss2.parser';
import { NewsRepository } from '../infrastructure/persistence/news.repository';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { ProviderRepository } from '../infrastructure/persistence/provider.repository';

@Module({
  providers: [
    PrismaService,
    GetProvidersUseCase,
    UpsertNewsUseCase,
    RSS2NewsParser,
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
    {
      provide: NEWS_REPOSITORY,
      useClass: NewsRepository,
    },
    ScheduledTaskService,
  ],
  exports: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
