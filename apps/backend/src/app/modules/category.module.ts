import { Module } from '@nestjs/common';

import { CATEGORY_REPOSITORY } from '../application/ports/category-repository.port';
import { PROVIDER_REPOSITORY } from '../application/ports/provider-repository.port';
import {
  CreateCategoryUseCase,
  GetCategoriesAndProvidersUseCase,
  GetCategoryUseCase,
  GetProvidersByCategoryUseCase,
} from '../application/use-cases/category.use-case';
import { CategoryRepository } from '../infrastructure/persistence/category.repository';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { ProviderRepository } from '../infrastructure/persistence/provider.repository';
import { CategoryController } from '../presentation/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    GetCategoriesAndProvidersUseCase,
    GetProvidersByCategoryUseCase,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoryModule {}
