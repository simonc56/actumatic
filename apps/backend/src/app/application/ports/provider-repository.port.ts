import { ProviderNews } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';

export const PROVIDER_REPOSITORY = Symbol('IProviderRepository');

export type FindNewsByProviderIdArgs = {
  providerId: string;
  begin: string;
  end: string;
};

export type FindNewsByProviderSlugArgs = {
  providerSlug: string;
  begin: string;
  end: string;
};

export interface IProviderRepository {
  findById(id: string): Promise<Provider | null>;
  findBySlug(slug: string): Promise<Provider | null>;
  findAll(): Promise<Provider[]>;
  findNewsByProviderId({
    providerId,
    begin,
    end,
  }: FindNewsByProviderIdArgs): Promise<ProviderNews | null>;
  findNewsByProviderSlug({
    providerSlug,
    begin,
    end,
  }: FindNewsByProviderSlugArgs): Promise<ProviderNews | null>;
  save(provider: Provider): Promise<Provider>;
  delete(id: string): Promise<Provider>;
}
