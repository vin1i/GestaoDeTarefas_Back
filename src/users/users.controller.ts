import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dtos";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersServices) {}

    @Get()
    findAll() {
        return this.usersService.getUsers();
    }

@Post()
create(@Body() user: CreateUserDto){
    return this.usersService.create(user) 
}



}