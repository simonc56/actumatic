import { INewsDto } from '@shared-libs';

export type INews = INewsDto & {};

export type NewsParamsType = {
  providerId?: string;
  after?: string;
  before?: string;
};
