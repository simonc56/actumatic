import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../core/entities/category.entity';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../ports/category-repository.port';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly userRepository: ICategoryRepository,
  ) {}

  async execute(userData: CreateCategoryDto): Promise<Category> {
    const user = new Category(userData);
    return this.userRepository.save(user);
  }
}

@Injectable()
export class GetCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly userRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Category | null> {
    return this.userRepository.findById(id);
  }
}

@Injectable()
export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly userRepository: ICategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.userRepository.findAll();
  }
}
