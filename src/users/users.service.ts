import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersServices {

  constructor (

    @InjectRepository(User)

    private userRepository: Repository<User>
  ) {}

  async create(createuserDto: CreateUserDto) {
    const userCreate = this.userRepository.create(createuserDto)
    return await this.userRepository.save(userCreate);
  }

  findAll() {
    const userFindAll = this.userRepository.find()
    return userFindAll;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
