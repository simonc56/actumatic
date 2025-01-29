import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../../core/entities/user.entity';
import { IUserRepository } from '../../application/ports/user-repository.port';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? new User(user) : null;
  }

  async save(user: User): Promise<User> {
    const saved = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });
    return new User(saved);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users.map((user) => new User(user));
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return new User(user);
  }
}
