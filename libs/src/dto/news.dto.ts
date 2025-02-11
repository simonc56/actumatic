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
