import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersServices) {}

@Get()
findAll() {
    return this.usersService.findAll();
}

@Post()
create(@Body() user: CreateUserDto){
    return this.usersService.create(user) 
}


@Patch(':id')
update(@Param('id') id: number, @Body() UpdateUserDto: UpdateUserDto) {
  return this.usersService.update(+id, UpdateUserDto);
}

@Delete(':id')
remove(@Param('id') id: number) {
  return this.usersService.remove(+id);
}


}