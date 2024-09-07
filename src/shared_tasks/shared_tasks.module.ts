import { Module } from '@nestjs/common';
import { SharedTasksService } from './shared_tasks.service';
import { SharedTasksController } from './shared_tasks.controller';

@Module({
  controllers: [SharedTasksController],
  providers: [SharedTasksService],
})
export class SharedTasksModule {}
