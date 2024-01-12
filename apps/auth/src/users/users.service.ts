import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './do/create-user.dto';
import { UserRepositry } from './users.repositry';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepositry:UserRepositry){}
    async create(createUserDto:CreateUserDto){
return this.usersRepositry.create(createUserDto)
    }
}
