import { Module } from '@nestjs/common';
import { PrismaService } from '../infrastructure/persistence/prisma.service';
import { PROVIDER_REPOSITORY } from '../application/ports/provider-repository.port';
import { ProviderRepository } from '../infrastructure/persistence/provider.repository';
import { CreateProviderUseCase, GetProvidersUseCase, GetProviderUseCase } from '../application/use-cases/provider.use-case';
import { ProviderController } from '../presentation/controllers/provider.controller';

@Module({
  controllers: [ProviderController],
  providers: [
    PrismaService,
    CreateProviderUseCase,
    GetProviderUseCase,
    GetProvidersUseCase,
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
  ],
  exports: [PROVIDER_REPOSITORY],
})
export class ProviderModule {}
