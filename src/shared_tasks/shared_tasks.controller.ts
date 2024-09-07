import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharedTasksService } from './shared_tasks.service';
import { CreateSharedTaskDto } from './dto/create-shared_task.dto';
import { UpdateSharedTaskDto } from './dto/update-shared_task.dto';

@Controller('shared-tasks')
export class SharedTasksController {
  constructor(private readonly sharedTasksService: SharedTasksService) {}

  @Post()
  create(@Body() createSharedTaskDto: CreateSharedTaskDto) {
    return this.sharedTasksService.create(createSharedTaskDto);
  }

  @Get()
  findAll() {
    return this.sharedTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedTaskDto: UpdateSharedTaskDto) {
    return this.sharedTasksService.update(+id, updateSharedTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedTasksService.remove(+id);
  }
}
