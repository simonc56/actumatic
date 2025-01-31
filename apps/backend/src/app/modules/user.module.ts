import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '../application/ports/user-repository.port';
import {
  CreateUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
} from '../application/use-cases/user.use-case';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { UserController } from '../presentation/controllers/user.controller';

@Module({
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
  exports: [CreateUserUseCase, GetUsersUseCase, GetUserUseCase], // Si d'autres modules en ont besoin
})
export class UserModule {}
