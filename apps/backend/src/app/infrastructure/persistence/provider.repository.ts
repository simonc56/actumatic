import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IProviderRepository } from '../../application/ports/provider-repository.port';
import { Provider } from '../../core/entities/provider.entity';

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

  async save(provider: Provider): Promise<Provider> {
    const saved = await this.prisma.provider.create({
      data: {
        url: provider.url,
        name: provider.name,
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

  async delete(id: string): Promise<Provider> {
    const provider = await this.prisma.provider.delete({
      where: { id },
    });
    return new Provider(provider);
  }
}
