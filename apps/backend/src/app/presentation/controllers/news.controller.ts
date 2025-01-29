import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNewsDto } from '../../application/dtos/create-news.dto';
import {
  CreateNewsUseCase,
  GetAllNewsUseCase,
  GetNewsUseCase,
} from '../../application/use-cases/news.use-case';

@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsUseCase: CreateNewsUseCase,
    private readonly getNewsUseCase: GetNewsUseCase,
    private readonly getAllNewsUseCase: GetAllNewsUseCase,
  ) {}

  @Post()
  async createNews(@Body() newsData: CreateNewsDto) {
    return this.createNewsUseCase.execute(newsData);
  }

  @Get()
  async getAllNews() {
    return this.getAllNewsUseCase.execute();
  }

  @Get(':id')
  async getNews(@Param('id') id: string) {
    return this.getNewsUseCase.execute(id);
  }
}
