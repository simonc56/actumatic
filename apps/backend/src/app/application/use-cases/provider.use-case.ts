import { Inject, Injectable } from '@nestjs/common';
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
    private readonly providerRepository: IProviderRepository,
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
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(provider: string): Promise<Provider | null> {
    if (provider.length === 36) {
      return this.providerRepository.findById(provider);
    }
    return this.providerRepository.findBySlug(provider);
  }
}

@Injectable()
export class GetNewsByProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute({
    provider,
    begin,
    end,
  }: {
    provider: string;
    begin: string;
    end: string;
  }) {
    if (provider.length === 36) {
      return this.providerRepository.findNewsByProviderId({
        providerId: provider,
        begin,
        end,
      });
    }
    return this.providerRepository.findNewsByProviderSlug({
      providerSlug: provider,
      begin,
      end,
    });
  }
}

@Injectable()
export class GetProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(): Promise<Provider[]> {
    return this.providerRepository.findAll();
  }
}
