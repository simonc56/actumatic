import { Module } from '@nestjs/common';
import { PROVIDER_REPOSITORY } from '../application/ports/provider-repository.port';
import {
  CreateProviderUseCase,
  GetNewsByProviderUseCase,
  GetProvidersUseCase,
  GetProviderUseCase,
} from '../application/use-cases/provider.use-case';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { ProviderRepository } from '../infrastructure/persistence/provider.repository';
import { ProviderController } from '../presentation/controllers/provider.controller';

@Module({
  controllers: [ProviderController],
  providers: [
    PrismaService,
    CreateProviderUseCase,
    GetProviderUseCase,
    GetNewsByProviderUseCase,
    GetProvidersUseCase,
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
  ],
  exports: [PROVIDER_REPOSITORY],
})
export class ProviderModule {}
