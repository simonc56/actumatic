import { Inject, Injectable } from '@nestjs/common';
import { ICategoryDto, IProviderDto } from '@shared-libs';
import { Category } from '../../core/entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../ports/category-repository.port';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly userRepository: ICategoryRepository,
  ) {}

  async execute(userData: CreateCategoryDto): Promise<ICategoryDto> {
    // éviter de créer avec new Category(), maitriser la création avec une méthode create() dédiée
    const category = Category.create(userData);
    const savedCategory = await this.userRepository.save(category);
    // éviter de retourner l'entité directement
    // faire un mapper si besoin
    return {
      id: savedCategory.id!,
      name: savedCategory.name,
      slug: savedCategory.slug,
    };
  }
}

@Injectable()
export class GetCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<ICategoryDto | null> {
    const category = await this.categoryRepository.findById(id);
    if (category)
      return { id: category.id!, name: category.name, slug: category.slug };
    return null;
  }
}

@Injectable()
export class GetProvidersByCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<IProviderDto[] | null> {
    const providers = await this.categoryRepository.findProvidersByCategory(id);
    return providers.map((provider) => ({
      id: provider.id!,
      name: provider.name,
      url: provider.url,
      categoryId: provider.categoryId,
    }));
  }
}

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly userRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<ICategoryDto[]> {
    const categories = await this.userRepository.findAll();
    return categories.map((category) => ({
      id: category.id!,
      name: category.name,
      slug: category.slug,
    }));
  }
}
