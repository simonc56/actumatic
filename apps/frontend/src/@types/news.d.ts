import { INewsDto, ISortedNewsDto } from '@shared-libs';

export type INews = INewsDto & {};

export type ISortedNews = ISortedNewsDto & {};

export type NewsParamsType = {
  providerId?: string;
  after?: string;
  before?: string;
};
