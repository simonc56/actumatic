import { News } from '../../core/entities/news.entity';

export const NEWS_REPOSITORY = Symbol('INewsRepository');

export interface INewsRepository {
  findById(id: string): Promise<News | null>;
  findAll({
    before,
    after,
  }: {
    before: string;
    after: string;
  }): Promise<News[]>;
  findByTitle(title: string): Promise<News[]>;
  save(news: News): Promise<News>;
  delete(id: string): Promise<News>;
}
