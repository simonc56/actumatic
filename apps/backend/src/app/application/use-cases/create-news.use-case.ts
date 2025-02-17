import { Inject, Injectable } from '@nestjs/common';
import { News } from '../../core/entities/news.entity';
import { CreateNewsDto } from '../dtos/create-news.dto';
import {
  NEWS_REPOSITORY,
  type INewsRepository,
} from '../ports/news-repository.port';

@Injectable()
export class CreateNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute(newsData: CreateNewsDto): Promise<News> {
    if (!newsData.createdAt) {
      newsData.createdAt = new Date();
    }
    const news = await this.newsRepository.save(newsData as News);

    return new News(news);
  }
}
