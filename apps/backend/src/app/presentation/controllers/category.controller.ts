import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../../application/dtos/create-category.dto';
import {
  CreateCategoryUseCase,
  GetCategoriesUseCase,
  GetCategoryUseCase,
} from '../../application/use-cases/category.use-case';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
  ) {}

  @Post()
  async createCategory(@Body() userData: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(userData);
  }

  @Get()
  async getCategories() {
    return this.getCategoriesUseCase.execute();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.getCategoryUseCase.execute(id);
  }
}
