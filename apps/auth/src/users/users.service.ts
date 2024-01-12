import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './do/create-user.dto';
import { UserRepositry } from './users.repositry';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepositry:UserRepositry){}
    async create(createUserDto:CreateUserDto){
        return this.usersRepositry.create({
            ...createUserDto,
            password:await bcrypt.hash(createUserDto.password,10)
        })
    }

    async validateUser(email:string,password:string){
        const user = await this.usersRepositry.findOne({email});
        const passwordIsValid = await bcrypt.compare(password,user.password);
        if(!passwordIsValid){
            throw new UnauthorizedException('Invalid credentials')
        }
        return user;
    }
}
