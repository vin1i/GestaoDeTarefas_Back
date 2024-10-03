import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { ProjectController } from "./project.controller";
import { ProjectsService } from "./project.service";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { TasksModule } from "src/tasks/tasks.module";
import { UserModule } from "src/users/users.module";

@Module({
    imports:[TypeOrmModule.forFeature([Project, Task, User]), TasksModule, UserModule],
    controllers: [ProjectController],
    providers: [ProjectsService],
})

export class ProjectModule {}