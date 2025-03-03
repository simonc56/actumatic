import { Inject, Injectable } from '@nestjs/common';
import { News } from '../../core/entities/news.entity';
import {
  NEWS_REPOSITORY,
  type INewsRepository,
} from '../ports/news-repository.port';

@Injectable()
export class GetAllNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute({
    begin,
    end,
  }: {
    begin: string;
    end: string;
  }): Promise<News[]> {
    return this.newsRepository.findAll({ begin, end });
  }
}
