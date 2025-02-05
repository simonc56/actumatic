import { News } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';

export const NEWS_PARSER = Symbol('INewsParser');

export interface INewsParser {
  fetchFrom(provider: Provider): Promise<News[]>;
}
