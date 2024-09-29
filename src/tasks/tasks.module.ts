import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CategoriesModule } from 'src/categories/categories.module'; 
import { UserModule } from 'src/users/users.module';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Task, Category, User]), CategoriesModule, UserModule], 
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
