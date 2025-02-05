import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import parseRSS2Provider from '../../infrastructure/external/rss2';
import { UpsertNewsUseCase } from './news.use-case';
import { GetProvidersUseCase } from './provider.use-case';

@Injectable()
export class ScheduledTaskService {
  constructor(
    private getProvidersUseCase: GetProvidersUseCase,
    private readonly upsertNewsUseCase: UpsertNewsUseCase,
  ) {}

  @Cron('*/20 * * * *') // Exécution toutes les 20 minutes
  async handleTask() {
    console.log('Tâche exécutée à', new Date().toISOString());

    // Récupérer tous les providers
    const providers = await this.getProvidersUseCase.execute();

    for (const provider of providers) {
      console.log(`Fetching news from ${provider.name}...`);
      try {
        // Récupérer et parser le flux RSS
        // a abstraire dans un use-case avec injection d'un service parser pour chaque provider (chacun a son format de RSS)
        const newsToAdd = await parseRSS2Provider(provider);

        for (const news of newsToAdd) {
          try {
            await this.upsertNewsUseCase.execute(news);
          } catch (error) {
            console.error(`Error saving news from ${provider.name}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error fetching news from ${provider.name}:`, error);
      }
    }
  }
}
