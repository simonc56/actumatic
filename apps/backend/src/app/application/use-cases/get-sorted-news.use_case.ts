import { Inject, Injectable } from '@nestjs/common';
import { News, SortedNews } from '../../core/entities/news.entity';
import {
  CATEGORY_REPOSITORY,
  ICategoryRepository,
} from '../ports/category-repository.port';
import {
  NEWS_REPOSITORY,
  type INewsRepository,
} from '../ports/news-repository.port';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../ports/provider-repository.port';

@Injectable()
export class GetSortedNewsUseCase {
  constructor(
    @Inject(NEWS_REPOSITORY) private readonly newsRepository: INewsRepository,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute({
    after,
    before,
  }: {
    after: string;
    before: string;
  }): Promise<SortedNews> {
    const allNewsPromise = this.newsRepository.findAll({ after, before });
    const allCategoriesPromise = this.categoryRepository.findAll();
    const allProvidersPromise = this.providerRepository.findAll();
    const [allNews, allCategories, allProviders] = await Promise.all([
      allNewsPromise,
      allCategoriesPromise,
      allProvidersPromise,
    ]);

    // D'abord, regroupons les news par provider
    const newsByProvider = allNews.reduce(
      (acc, news) => {
        if (!acc[news.providerId]) {
          const provider = allProviders.find((p) => p.id === news.providerId);
          acc[news.providerId] = {
            providerId: news.providerId,
            providerName: provider?.name || '',
            categoryId: provider?.categoryId || '',
            news: [],
          };
        }
        acc[news.providerId].news.push({
          id: news.id,
          title: news.title,
          url: news.url,
          createdAt: news.createdAt,
        });
        return acc;
      },
      {} as Record<
        string,
        {
          providerId: string;
          providerName: string;
          categoryId: string;
          news: Omit<News, 'providerId'>[];
        }
      >,
    );

    // Ensuite, regroupons les providers par catégorie
    const sortedNews: SortedNews = allCategories
      .map((category) => {
        const providersInCategory = Object.values(newsByProvider)
          .filter((provider) => provider.categoryId === category.id)
          .map(({ providerId, providerName, news }) => ({
            id: providerId,
            name: providerName,
            news,
          }));

        return {
          id: category.id!,
          name: category.name,
          providers: providersInCategory,
        };
      })
      .filter((category) => category.providers.length > 0);
    return sortedNews;
  }
}
