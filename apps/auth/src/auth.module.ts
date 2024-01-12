import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LocalStrategy } from '../Strategy/local.strategy';

@Module({
  imports: [UsersModule,LoggerModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        DATABASE_URI:Joi.string().required(),
        JWT_SECRET:Joi.string().required(),
        JWT_EXPIRATION:Joi.string().required(),
        PORT:Joi.number().required()
      })
    }),
    JwtModule.registerAsync({
    useFactory:(configService:ConfigService)=>({
      secret:configService.get<string>('JWT_SECRET'),
      signOptions:{
        expiresIn:`${configService.get('JWT_EXPIRATION')}s`
      }
    }),
    inject:[ConfigService]
   })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {}