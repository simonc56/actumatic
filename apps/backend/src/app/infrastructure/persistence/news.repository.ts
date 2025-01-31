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
      },
    });
    return new News(saved);
  }

  async findAll(): Promise<News[]> {
    const news: News[] = await this.prisma.news.findMany();
    return news.map((news) => new News(news));
  }

  async delete(id: string): Promise<News> {
    const news = await this.prisma.news.delete({
      where: { id },
    });
    return new News(news);
  }

  async findByDate(date: string): Promise<News[]> {
    const news: News[] = await this.prisma.news.findMany({
      where: { createdAt: date },
    });
    return news.map((news) => new News(news));
  }

  async findByDateAndProvider(
    date: string,
    providerId: string,
  ): Promise<News[]> {
    const news: News[] = await this.prisma.news.findMany({
      where: { createdAt: date, providerId },
    });
    return news.map((news) => new News(news));
  }

  async findByTitle(title: string): Promise<News[]> {
    const news: News[] = await this.prisma.news.findMany({
      where: { title },
    });
    return news.map((news) => new News(news));
  }
}
