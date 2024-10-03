import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { userId, categoryId, ...taskData } = createTaskDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com esse ID ${userId} não encontrado`);
    }

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Categoria com esse ID ${categoryId} não encontrada`);
    }

    const taskCreate = this.taskRepository.create({
      ...taskData,
      user,
      category,
      status: TaskStatus.Pending,
    });

    return await this.taskRepository.save(taskCreate);
  }

  async findAll() {
    return await this.taskRepository.find({
      relations: ['user', 'category'],
    });
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user', 'category']});
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // Verificar se a tarefa existe antes de atualizar
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['user', 'category'] });
    if (!task) {
        throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    // Atualiza os dados da tarefa com os dados do DTO
    Object.assign(task, updateTaskDto);

    // Salva a tarefa atualizada
    const updatedTask = await this.taskRepository.save(task);

    // Retorna a tarefa atualizada, incluindo as relações
    return this.taskRepository.findOne({ where: { id: updatedTask.id }, relations: ['user', 'category'] });
}


  async remove(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
    return { message: `Tarefa com ID ${id} removida` };
  }
}
