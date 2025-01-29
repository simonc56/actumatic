import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../core/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../ports/user-repository.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(userData: User): Promise<User> {
    const user = new User(userData);
    return this.userRepository.save(user);
  }
}

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
