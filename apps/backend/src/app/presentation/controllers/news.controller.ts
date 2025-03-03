import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateNewsDto } from '../../application/dtos/create-news.dto';
import { CreateNewsUseCase } from '../../application/use-cases/create-news.use-case';
import { GetAllNewsUseCase } from '../../application/use-cases/get-all-news.use-case';
import { GetNewsUseCase } from '../../application/use-cases/get-news.use-case';
import { GetSortedNewsUseCase } from '../../application/use-cases/get-sorted-news.use_case';

@Controller('news')
export class NewsController {
  constructor(
    private readonly createNewsUseCase: CreateNewsUseCase,
    private readonly getNewsUseCase: GetNewsUseCase,
    private readonly getAllNewsUseCase: GetAllNewsUseCase,
    private readonly getSortedNewsUseCase: GetSortedNewsUseCase,
  ) {}

  @Post()
  async createNews(@Body() newsData: CreateNewsDto) {
    return this.createNewsUseCase.execute(newsData);
  }

  @Get('all')
  async getAllNews(
    @Query('begin') begin: string, // ISO formated date string, ex. 2021-12-31
    @Query('end') end: string,
  ) {
    return this.getAllNewsUseCase.execute({ begin, end });
  }

  @Get('sorted')
  async getSortedNews(
    @Query('begin') begin: string,
    @Query('end') end: string,
  ) {
    return this.getSortedNewsUseCase.execute({ begin, end });
  }

  @Get(':id')
  async getNews(@Param('id') id: string) {
    return this.getNewsUseCase.execute(id);
  }
}
