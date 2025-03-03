import { CreateNewsDto } from '../../application/dtos/create-news.dto';

export class News {
  id?: string;
  title!: string;
  url!: string;
  providerId!: string;
  createdAt!: Date;

  constructor(props: News) {
    Object.assign(this, props);
  }

  static create(news: CreateNewsDto): News {
    if (!news.createdAt) {
      news.createdAt = new Date();
    }
    return new News(news as News);
  }
}

export type ProviderNews = {
  providerId: string;
  news: Omit<News, 'providerId'>[];
};

export type CategoryNews = {
  providerId: string;
  news: News[];
};

export type SortedNews = {
  categoryId: string;
  providers: {
    providerId: string;
    news: Omit<News, 'providerId'>[];
  }[];
}[];
