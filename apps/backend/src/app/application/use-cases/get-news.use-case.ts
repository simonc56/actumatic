import { Inject, Injectable } from '@nestjs/common';
import { News } from '../../core/entities/news.entity';
import {
  type INewsRepository,
  NEWS_REPOSITORY,
} from '../ports/news-repository.port';

@Injectable()
export class GetNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
  ) {}

  async execute(id: string): Promise<News | null> {
    return this.newsRepository.findById(id);
  }
}
