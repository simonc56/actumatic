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

export type ISortedNewsDto = {
  id: string;
  name: string;
  providers: {
    id: string;
    name: string;
    news: INewsDto[];
  }[];
}[];
