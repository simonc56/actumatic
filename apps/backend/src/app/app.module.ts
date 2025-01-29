import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
} from './application/use-cases/user.use-case';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { PrismaService } from './infrastructure/persistence/prisma.service';
import { UserController } from './presentation/controllers/user.controller';
import { USER_REPOSITORY } from './application/ports/user-repository.port';
import { NewsModule } from './modules/news.module';
import { CategoryModule } from './modules/category.module';

@Module({
  imports: [NewsModule, CategoryModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class AppModule {}
