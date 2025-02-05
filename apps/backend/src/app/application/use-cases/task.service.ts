import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../infrastructure/persistence/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  @Cron('*/20 * * * *') // Exécution toutes les 20 minutes
  async handleTask() {
    console.log('Tâche exécutée à', new Date().toISOString());
    // Place ton action ici avec async/await
  }
}
