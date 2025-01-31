import { News } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';

export const PROVIDER_REPOSITORY = Symbol('IProviderRepository');

export interface IProviderRepository {
  findById(id: string): Promise<Provider | null>;
  findAll(): Promise<Provider[]>;
  findNewsByProvider(
    providerId: string,
    after: string,
    before: string
  ): Promise<News[]>;
  save(provider: Provider): Promise<Provider>;
  delete(id: string): Promise<Provider>;
}
