import { Module } from '@nestjs/common';
import { ScheduledTaskService } from '../application/use-cases/scheduled-task.service';

@Module({
  providers: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
