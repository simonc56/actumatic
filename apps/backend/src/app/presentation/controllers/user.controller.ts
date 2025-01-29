import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateUserUseCase,
  GetUsersUseCase,
  GetUserUseCase,
} from '../../application/use-cases/user.use-case';
import { User } from '../../core/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() userData: User) {
    return this.createUserUseCase.execute(userData);
  }

  @Get()
  async getUsers() {
    return this.getUsersUseCase.execute();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.getUserUseCase.execute(id);
  }
}
