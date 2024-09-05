import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    
    title?: string; // título da tarefa (opcional para atualização)
    description?: string; // descrição da tarefa (opcional para atualização)
    priority?: TaskPriority; // prioridade da tarefa (opcional para atualização)
    status?: TaskStatus; // status da tarefa (opcional para atualização)
    due_date?: Date; // data de vencimento da tarefa (opcional para atualização)

}
