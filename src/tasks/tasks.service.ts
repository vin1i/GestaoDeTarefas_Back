import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor ( 
    
    @InjectRepository(Task)

    private taskRepository: Repository<Task>) {}


  async create(createTaskDto: CreateTaskDto) {
    const taskCreate = this.taskRepository.create(createTaskDto)
    taskCreate.status = TaskStatus.Pending; //Puxando do task.entity - enum do status, OBS: Isso SEMPRE vai colocar um padrão em Status na hora de criar a task, sempre vai colocar "pending" no status!
    
    return await this.taskRepository.save(taskCreate);
    
    
  }   

  findAll() {
    const taskFindAll = this.taskRepository.find()
    return taskFindAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
