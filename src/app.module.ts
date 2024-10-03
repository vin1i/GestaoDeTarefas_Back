import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { Task } from './tasks/entities/task.entity';
import { User } from './users/entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedTasksModule } from './shared_tasks/shared_tasks.module';
import { Category } from './categories/entities/category.entity';
import { Project } from './project/entities/project.entity';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [UserModule, TasksModule, CategoriesModule, ProjectModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      password: 'root',
      database:'gestaodetarefas',
      entities: [Task, User, Category, Project],
      synchronize: true, //"synchronize: true" - Não deve ser usada em produção, caso contrário, você irá perder dados de produção.

  }),
    CategoriesModule,
    CommentsModule,
    NotificationsModule,
    SharedTasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
