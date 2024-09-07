import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TasksService {
  constructor ( 
    
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // 'categoryRepository' é referente à entidade Category.
  ) {}

  
  

  

    async create(createTaskDto: CreateTaskDto) {
    const taskCreate = this.taskRepository.create(createTaskDto)
    taskCreate.status = TaskStatus.Pending; //Puxando do task.entity - enum do status, OBS: Isso SEMPRE vai colocar um padrão em Status na hora de criar a task, sempre vai colocar "pending" no status!
    
    return await this.taskRepository.save(taskCreate);
    
    
  }   

  async findAll() {
    const taskFindAll = this.taskRepository.find()
    return await taskFindAll;
  }

  async findOne(id: number) {
    
    const taskFindOne = this.taskRepository.findOne({ where: {id}})
    return await taskFindOne;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id,updateTaskDto)
    return await this.taskRepository.findOne({where: {id}});
  }

  async remove(id: number) {
    await this.taskRepository.delete(id)
    return await this.taskRepository.findOne({where: {id}});
  }
}
