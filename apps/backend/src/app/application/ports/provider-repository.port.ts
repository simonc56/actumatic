import { Provider } from '../../core/entities/provider.entity';

export const PROVIDER_REPOSITORY = Symbol('IProviderRepository');

export interface IProviderRepository {
  findById(id: string): Promise<Provider | null>;
  findAll(): Promise<Provider[]>;
  findByCategory(categoryId: string): Promise<Provider[]>;
  save(provider: Provider): Promise<Provider>;
  delete(id: string): Promise<Provider>;
}
