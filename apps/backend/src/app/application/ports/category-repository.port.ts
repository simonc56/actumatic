import { Category } from '../../core/entities/category.entity';
import { Provider } from '../../core/entities/provider.entity';

export const CATEGORY_REPOSITORY = Symbol('ICategoryRepository');

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findProvidersByCategory(categoryId: string): Promise<Provider[]>;
  save(category: Category): Promise<Category>;
  delete(id: string): Promise<Category>;
}
