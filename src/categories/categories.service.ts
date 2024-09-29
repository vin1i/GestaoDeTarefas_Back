import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

 async create(createCategoryDto: CreateCategoryDto) {
  const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

 async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({where: {id}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto)
    return await this.categoryRepository.findOne({where: {id}});
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    return await this.categoryRepository.remove(category);
  }
}
