import { CreateNewsDto } from "../../application/dtos/create-news.dto";

export class News {
  id?: string;
  title!: string;
  url!: string;
  providerId!: string;

  constructor(props: News) {
    Object.assign(this, props);
  }

  static create(news: CreateNewsDto): News {
    return new News(news);
  }
}
