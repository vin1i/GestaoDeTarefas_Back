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

  async findOne(id: number) {
    const userFindOne = this.userRepository.findOne({where:{id}})
    return await userFindOne;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto)
    return await this.userRepository.findOne({where:{id}});
  }

  async remove(id: number) {
     this.userRepository.delete(id)
    return await this.userRepository.findOne({where: {id}});
  }
}
