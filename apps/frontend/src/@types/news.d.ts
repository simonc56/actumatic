import { INewsDto, ISortedNewsDto } from '@actumatic/libs';

export type INews = INewsDto & {};

export type ISortedNews = ISortedNewsDto & {};

export type NewsParamsType = {
  providerId?: string;
  begin?: string;
  end?: string;
};
