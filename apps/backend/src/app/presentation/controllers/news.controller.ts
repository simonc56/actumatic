import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async getAllNews(
    @Query('after') after: string, // ISO formated date string, ex. 2021-12-31
    @Query('before') before: string,
  ) {
    return this.getAllNewsUseCase.execute({ after, before });
  }

  @Get(':id')
  async getNews(@Param('id') id: string) {
    return this.getNewsUseCase.execute(id);
  }
}
