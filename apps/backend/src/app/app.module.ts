import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CategoryModule } from './modules/category.module';
import { NewsModule } from './modules/news.module';
import { ProviderModule } from './modules/provider.module';
import { TaskModule } from './modules/task.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    UserModule,
    NewsModule,
    CategoryModule,
    ProviderModule,
    ScheduleModule.forRoot(),
    TaskModule,
  ],
})
export class AppModule {}
