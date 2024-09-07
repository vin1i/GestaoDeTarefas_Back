import { Injectable } from '@nestjs/common';
import { CreateSharedTaskDto } from './dto/create-shared_task.dto';
import { UpdateSharedTaskDto } from './dto/update-shared_task.dto';

@Injectable()
export class SharedTasksService {
  create(createSharedTaskDto: CreateSharedTaskDto) {
    return 'This action adds a new sharedTask';
  }

  findAll() {
    return `This action returns all sharedTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedTask`;
  }

  update(id: number, updateSharedTaskDto: UpdateSharedTaskDto) {
    return `This action updates a #${id} sharedTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedTask`;
  }
}
