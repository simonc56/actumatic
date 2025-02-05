import { ICreateNewsDto } from '@shared-libs';
import Parser from 'rss-parser';
import { Provider } from '../../core/entities/provider.entity';

const parser = new Parser();

type RSS2Item = {
  title: string;
  link: string;
};

export default async function parseRSS2Provider(
  provider: Provider,
): Promise<ICreateNewsDto[]> {
  const feed = await parser.parseURL(provider.url);
  console.log(
    `Fetched ${feed.items.length} news from RSS2 provider: ${provider.name}`,
  );
  return feed.map((item: RSS2Item) => ({
    title: item.title,
    url: item.link,
    providerId: provider.id,
  }));
}
