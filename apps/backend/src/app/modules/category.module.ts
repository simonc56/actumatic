import { Module } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from '../application/ports/category-repository.port';
import {
  CreateCategoryUseCase,
  GetCategoriesUseCase,
  GetCategoryUseCase,
  GetProvidersByCategoryUseCase,
} from '../application/use-cases/category.use-case';
import { CategoryRepository } from '../infrastructure/persistence/category.repository';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { CategoryController } from '../presentation/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    GetCategoriesUseCase,
    GetProvidersByCategoryUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoryModule {}
