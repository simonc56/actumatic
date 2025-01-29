import { Module } from '@nestjs/common';

import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { CATEGORY_REPOSITORY } from '../application/ports/category-repository.port';
import { CategoryRepository } from '../infrastructure/persistence/category.repository';
import {
  CreateCategoryUseCase,
  GetCategoriesUseCase,
  GetCategoryUseCase,
} from '../application/use-cases/category.use-case';
import { CategoryController } from '../presentation/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    GetCategoriesUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoryModule {}
