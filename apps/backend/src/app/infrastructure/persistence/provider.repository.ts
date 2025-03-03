import { Injectable } from '@nestjs/common';
import {
  FindNewsByProviderIdArgs,
  FindNewsByProviderSlugArgs,
  IProviderRepository,
} from '../../application/ports/provider-repository.port';
import { News, ProviderNews } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProviderRepository implements IProviderRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<Provider | null> {
    const provider = await this.prisma.provider.findUnique({
      where: { id },
    });
    return provider ? new Provider(provider) : null;
  }

  async findBySlug(slug: string): Promise<Provider | null> {
    const provider = await this.prisma.provider.findUnique({
      where: { slug },
    });
    return provider ? new Provider(provider) : null;
  }

  async save(provider: Provider): Promise<Provider> {
    const saved = await this.prisma.provider.create({
      data: {
        url: provider.url,
        feedUrl: provider.feedUrl,
        feedType: provider.feedType,
        name: provider.name,
        slug: provider.slug,
        categoryId: provider.categoryId,
      },
    });
    return new Provider(saved);
  }

  async findAll(): Promise<Provider[]> {
    const providers: Provider[] = await this.prisma.provider.findMany();
    return providers.map((provider) => new Provider(provider));
  }

  async findByCategory(categoryId: string): Promise<Provider[]> {
    const providers = await this.prisma.provider.findMany({
      where: { categoryId },
    });
    return providers.map((provider: Provider) => new Provider(provider));
  }

  async findNewsByProviderId({
    providerId,
    begin,
    end,
  }: FindNewsByProviderIdArgs): Promise<ProviderNews | null> {
    const provider = await this.prisma.provider.findUnique({
      where: { id: providerId },
    });
    if (!provider) {
      return null;
    }
    const where: any = { providerId };
    if (begin || end) {
      where.createdAt = {};
      if (end) {
        where.createdAt.lte = new Date(end).toISOString();
      }
      if (begin) {
        where.createdAt.gte = new Date(begin).toISOString();
      }
    }
    const news = await this.prisma.news.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
    const response: ProviderNews = {
      providerId: provider.id,
      news: news.map((news) => new News(news)),
    };
    return response;
  }

  async findNewsByProviderSlug({
    providerSlug,
    begin,
    end,
  }: FindNewsByProviderSlugArgs): Promise<ProviderNews | null> {
    const provider = await this.prisma.provider.findUnique({
      where: { slug: providerSlug },
    });
    if (!provider) {
      return null;
    }
    const where: any = { providerId: provider.id };
    if (begin || end) {
      where.createdAt = {};
      if (end) {
        where.createdAt.lte = new Date(end).toISOString();
      }
      if (begin) {
        where.createdAt.gte = new Date(begin).toISOString();
      }
    }
    const news = await this.prisma.news.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    });
    const response: ProviderNews = {
      providerId: provider.id,
      news: news.map((news) => new News(news)),
    };
    return response;
  }

  async delete(id: string): Promise<Provider> {
    const provider = await this.prisma.provider.delete({
      where: { id },
    });
    return new Provider(provider);
  }
}
