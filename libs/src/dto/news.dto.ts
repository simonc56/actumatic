import { ICategoryDto } from './category.dto';
import { IProviderDto } from './provider.dto';

export type ICreateNewsDto = {
  title: string;
  url: string;
  providerId: string;
  createdAt?: Date;
};

export type INewsDto = {
  id: string;
  title: string;
  url: string;
  providerId: string;
  createdAt: string;
};

export type IProviderNewsDto = {
  providerId: string;
  news: Omit<INewsDto, 'providerId'>[];
};

export type ISortedNewsDto = {
  categoryId: string;
  providers: {
    providerId: string;
    news: Omit<INewsDto, 'providerId'>[];
  }[];
}[];

export type ICategoriesAndProvidersDto = { categories: ICategoryDetailedDto[] };

export type ICategoryDetailedDto = ICategoryDto & {
  providers: Omit<IProviderDto, 'categoryId'>[];
};
