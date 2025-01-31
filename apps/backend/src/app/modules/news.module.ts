import { Module } from '@nestjs/common';

import { NEWS_REPOSITORY } from '../application/ports/news-repository.port';
import {
  CreateNewsUseCase,
  GetAllNewsUseCase,
  GetNewsUseCase,
} from '../application/use-cases/news.use-case';
import { NewsRepository } from '../infrastructure/persistence/news.repository';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { NewsController } from '../presentation/controllers/news.controller';

@Module({
  controllers: [NewsController],
  providers: [
    PrismaService,
    CreateNewsUseCase,
    GetNewsUseCase,
    GetAllNewsUseCase,
    {
      provide: NEWS_REPOSITORY,
      useClass: NewsRepository,
    },
  ],
  exports: [NEWS_REPOSITORY],
})
export class NewsModule {}
