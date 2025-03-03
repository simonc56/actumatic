import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import {
  CreateCategoryUseCase,
  GetCategoriesAndProvidersUseCase,
  GetCategoryUseCase,
  GetProvidersByCategoryUseCase,
} from '../../application/use-cases/category.use-case';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesAndProvidersUseCase: GetCategoriesAndProvidersUseCase,
    private readonly getProvidersByCategoryUseCase: GetProvidersByCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
  ) {}

  @Post()
  async createCategory(@Body() userData: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(userData);
  }

  @Get('provider')
  async getCategories() {
    return this.getCategoriesAndProvidersUseCase.execute();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.getCategoryUseCase.execute(id);
  }

  @Get(':id/provider')
  async getProvidersByCategory(@Param('id') id: string) {
    return this.getProvidersByCategoryUseCase.execute(id);
  }
}
