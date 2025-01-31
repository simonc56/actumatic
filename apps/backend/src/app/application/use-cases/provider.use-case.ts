import { Inject, Injectable } from '@nestjs/common';
import { News } from '../../core/entities/news.entity';
import { Provider } from '../../core/entities/provider.entity';
import { CreateProviderDto } from '../dtos/create-provider.dto';
import {
  PROVIDER_REPOSITORY,
  type IProviderRepository,
} from '../ports/provider-repository.port';

@Injectable()
export class CreateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository
  ) {}

  async execute(userData: CreateProviderDto): Promise<Provider> {
    const user = new Provider(userData);
    return this.providerRepository.save(user);
  }
}

@Injectable()
export class GetProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository
  ) {}

  async execute(id: string): Promise<Provider | null> {
    return this.providerRepository.findById(id);
  }
}

@Injectable()
export class GetNewsByProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository
  ) {}

  async execute(providerId: string, after: string, before: string): Promise<News[]> {
    return this.providerRepository.findNewsByProvider(providerId, after, before);
  }
}

@Injectable()
export class GetProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository
  ) {}

  async execute(): Promise<Provider[]> {
    return this.providerRepository.findAll();
  }
}
