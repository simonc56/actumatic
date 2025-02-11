import { Injectable } from '@nestjs/common';
import Parser, { Item } from 'rss-parser';
import { INewsParser } from '../../application/ports/news-parser.port';
import { News } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';
import { parseFrenchDate } from '../../utils/parsing';

const parser = new Parser();

@Injectable()
export class RSS2NewsParser implements INewsParser {
  fetchNewsFromProvider(provider: Provider): Promise<News[]> {
    throw new Error('Method not implemented.');
  }
  async fetchFrom(provider: Provider): Promise<News[]> {
    const feed = await parser.parseURL(provider.feedUrl);
    return feed.items.map((item: Item) => ({
      title: item.title || '',
      url: item.link || '',
      providerId: provider.id!,
      createdAt: parseFrenchDate(item.pubDate || new Date().toISOString()),
    }));
  }
}
