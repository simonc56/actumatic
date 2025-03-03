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

  @Get(':provider/news')
  async getNewsByProvider(
    @Param('provider') provider: string,
    @Query('begin') begin: string,
    @Query('end') end: string,
  ) {
    return this.getNewsByProviderUseCase.execute({
      provider,
      begin,
      end,
    });
  }

  @Get(':provider')
  async getProvider(@Param('provider') provider: string) {
    return this.getProviderUseCase.execute(provider);
  }
}
