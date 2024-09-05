import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { Task } from './tasks/entities/task.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UserModule, TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username:'root',
      password: 'root',
      database:'gestaodetarefas',
      entities: [Task, User],
      synchronize: true, //"synchronize: true" - Não deve ser usada em produção, caso contrário, você irá perder dados de produção.

  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
