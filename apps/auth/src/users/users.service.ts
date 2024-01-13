import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './do/create-user.dto';
import { UserRepositry } from './users.repositry';
import * as bcrypt from 'bcryptjs'
import { GetUserDto } from './do/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepositry:UserRepositry){}
    async create(createUserDto:CreateUserDto){
        await this.validaCreateUserDto(createUserDto)
        return this.usersRepositry.create({
            ...createUserDto,
            password:await bcrypt.hash(createUserDto.password,10)
        })
    }
async validaCreateUserDto(createUserDto:CreateUserDto){
    try{
        await this.usersRepositry.findOne({email:createUserDto.email})
    }catch(err){
            return;
    }
    throw new UnprocessableEntityException('Email already exists')
}
    async validateUser(email:string,password:string){
        const user = await this.usersRepositry.findOne({email});
        const passwordIsValid = await bcrypt.compare(password,user.password);
        if(!passwordIsValid){
            throw new UnauthorizedException('Invalid credentials')
        }
        return user;
    }

    async getUser(getuserDto:GetUserDto){
        return this.usersRepositry.findOne(getuserDto)
    }
}
