import { Module } from '@nestjs/common';
import { TaskService } from '../application/use-cases/task.service';

@Module({
  providers: [TaskService],
})
export class TaskModule {}
