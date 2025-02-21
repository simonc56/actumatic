import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../application/ports/category-repository.port';
import { Category } from '../../core/entities/category.entity';
import { Provider } from '../../core/entities/provider.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category ? new Category(category) : null;
  }

  async save(category: Category): Promise<Category> {
    const saved = await this.prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
      },
    });
    return new Category(saved);
  }

  async findAll(): Promise<Category[]> {
    const categorys: Category[] = await this.prisma.category.findMany();
    return categorys.map((category) => new Category(category));
  }

  async findProvidersByCategory(categoryId: string): Promise<Provider[]> {
    const providers = await this.prisma.provider.findMany({
      where: { categoryId },
    });
    return providers.map((provider: Provider) => new Provider(provider));
  }

  async findByName(name: string): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { name },
    });
    return categories.map((category: Category) => new Category(category));
  }

  async delete(id: string): Promise<Category> {
    const category = await this.prisma.category.delete({
      where: { id },
    });
    return new Category(category);
  }
}
