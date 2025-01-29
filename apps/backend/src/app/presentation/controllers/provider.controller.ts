import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProviderDto } from '../../application/dtos/create-provider.dto';
import {
  CreateProviderUseCase,
  GetProvidersUseCase,
  GetProviderUseCase,
} from '../../application/use-cases/provider.use-case';

@Controller('category')
export class ProviderController {
  constructor(
    private readonly createProviderUseCase: CreateProviderUseCase,
    private readonly getProvidersUseCase: GetProvidersUseCase,
    private readonly getProviderUseCase: GetProviderUseCase,
  ) {}

  @Post()
  async createProvider(@Body() userData: CreateProviderDto) {
    return this.createProviderUseCase.execute(userData);
  }

  @Get()
  async getProviders() {
    return this.getProvidersUseCase.execute();
  }

  @Get(':id')
  async getProvider(@Param('id') id: string) {
    return this.getProviderUseCase.execute(id);
  }
}
