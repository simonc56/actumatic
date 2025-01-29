import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../../core/entities/provider.entity';
import {
  PROVIDER_REPOSITORY,
  type IProviderRepository,
} from '../ports/provider-repository.port';
import { CreateProviderDto } from '../dtos/create-provider.dto';

@Injectable()
export class CreateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly userRepository: IProviderRepository,
  ) {}

  async execute(userData: CreateProviderDto): Promise<Provider> {
    const user = new Provider(userData);
    return this.userRepository.save(user);
  }
}

@Injectable()
export class GetProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly userRepository: IProviderRepository,
  ) {}

  async execute(id: string): Promise<Provider | null> {
    return this.userRepository.findById(id);
  }
}

@Injectable()
export class GetProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly userRepository: IProviderRepository,
  ) {}

  async execute(): Promise<Provider[]> {
    return this.userRepository.findAll();
  }
}
