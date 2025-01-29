import { Inject, Injectable } from '@nestjs/common';
import { News } from '../../core/entities/news.entity';
import { CreateNewsDto } from '../dtos/create-news.dto';
import {
  type INewsRepository,
  NEWS_REPOSITORY,
} from '../ports/news-repository.port';

@Injectable()
export class CreateNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute(newsData: CreateNewsDto): Promise<News> {
    const news = await this.newsRepository.save(newsData);

    return new News(news);
  }
}

@Injectable()
export class GetNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute(id: string): Promise<News | null> {
    return this.newsRepository.findById(id);
  }
}

@Injectable()
export class GetAllNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute(): Promise<News[]> {
    return this.newsRepository.findAll();
  }
}
