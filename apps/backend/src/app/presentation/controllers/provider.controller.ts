import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProviderDto } from '../../application/dtos/create-provider.dto';
import {
  CreateProviderUseCase,
  GetNewsByProviderUseCase,
  GetProvidersUseCase,
  GetProviderUseCase,
} from '../../application/use-cases/provider.use-case';

@Controller('provider')
export class ProviderController {
  constructor(
    private readonly createProviderUseCase: CreateProviderUseCase,
    private readonly getProvidersUseCase: GetProvidersUseCase,
    private readonly getProviderUseCase: GetProviderUseCase,
    private readonly getNewsByProviderUseCase: GetNewsByProviderUseCase,
  ) {}

  @Post()
  async createProvider(@Body() userData: CreateProviderDto) {
    return this.createProviderUseCase.execute(userData);
  }

  @Get()
  async getProviders() {
    return this.getProvidersUseCase.execute();
  }

  @Get(':providerId/news')
  async getNewsByProvider(
    @Param('providerId') providerId: string,
    @Query('after') after: string,
    @Query('before') before: string,
  ) {
    return this.getNewsByProviderUseCase.execute(providerId, after, before);
  }

  @Get(':id')
  async getProvider(@Param('id') id: string) {
    return this.getProviderUseCase.execute(id);
  }
}
