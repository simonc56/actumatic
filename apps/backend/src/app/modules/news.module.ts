import { Module } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from '../application/ports/category-repository.port';
import { NEWS_REPOSITORY } from '../application/ports/news-repository.port';
import { PROVIDER_REPOSITORY } from '../application/ports/provider-repository.port';
import { CreateNewsUseCase } from '../application/use-cases/create-news.use-case';
import { GetAllNewsUseCase } from '../application/use-cases/get-all-news.use-case';
import { GetNewsUseCase } from '../application/use-cases/get-news.use-case';
import { GetSortedNewsUseCase } from '../application/use-cases/get-sorted-news.use_case';
import { CategoryRepository } from '../infrastructure/persistence/category.repository';
import { NewsRepository } from '../infrastructure/persistence/news.repository';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { ProviderRepository } from '../infrastructure/persistence/provider.repository';
import { NewsController } from '../presentation/controllers/news.controller';

@Module({
  controllers: [NewsController],
  providers: [
    PrismaService,
    CreateNewsUseCase,
    GetNewsUseCase,
    GetAllNewsUseCase,
    GetSortedNewsUseCase,
    {
      provide: NEWS_REPOSITORY,
      useClass: NewsRepository,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
  ],
  exports: [NEWS_REPOSITORY],
})
export class NewsModule {}
