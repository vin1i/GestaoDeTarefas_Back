import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dtos";

    global.users = []

@Injectable()
export class UsersServices {
    getUsers(): any[] {

        return global.users; 
    }

    create(user: CreateUserDto) {
        global.users.push(user);
    }
}