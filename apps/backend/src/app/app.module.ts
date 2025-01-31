import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category.module';
import { NewsModule } from './modules/news.module';
import { ProviderModule } from './modules/provider.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, NewsModule, CategoryModule, ProviderModule],
})
export class AppModule {}
