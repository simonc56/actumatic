import { Injectable } from '@nestjs/common';
import { INewsRepository } from '../../application/ports/news-repository.port';
import { News } from '../../core/entities/news.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class NewsRepository implements INewsRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<News | null> {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });
    return news ? new News(news) : null;
  }

  async save(news: News): Promise<News> {
    const saved = await this.prisma.news.create({
      data: {
        title: news.title,
        url: news.url,
        providerId: news.providerId,
        createdAt: news.createdAt,
      },
    });
    return new News(saved);
  }

  async upsert(news: News): Promise<News> {
    const existing = await this.prisma.news.findUnique({
      where: { url: news.url },
    });

    if (existing) {
      return new News(existing);
    }

    const upserted = await this.prisma.news.create({
      data: {
        title: news.title,
        url: news.url,
        providerId: news.providerId,
        createdAt: news.createdAt,
      },
    });
    return new News(upserted);
  }

  async findAll({
    begin,
    end,
  }: {
    begin: string;
    end: string;
  }): Promise<News[]> {
    const where: any = {};
    if (begin || end) {
      where.createdAt = {};
      if (end) {
        where.createdAt.lte = new Date(end).toISOString();
      }
      if (begin) {
        where.createdAt.gte = new Date(begin).toISOString();
      }
    }
    const news: News[] = await this.prisma.news.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      take: 5000,
    });
    return news.map((news) => new News(news));
  }

  async delete(id: string): Promise<News> {
    const news = await this.prisma.news.delete({
      where: { id },
    });
    return new News(news);
  }

  async findByTitle(title: string): Promise<News[]> {
    const news: News[] = await this.prisma.news.findMany({
      where: { title },
      orderBy: [{ createdAt: 'desc' }],
    });
    return news.map((news) => new News(news));
  }
}
