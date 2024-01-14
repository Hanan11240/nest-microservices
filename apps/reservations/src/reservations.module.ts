import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule, PAYMENTS_SERVICE } from '@app/common';
import { ReservationsRepositry } from './reservations.repositry';
import { ReservationDocument, ReservationsSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [DatabaseModule, 
    DatabaseModule.forFeature(
      [
        { name: ReservationDocument.name, schema: ReservationsSchema }
      ]
      ), 
      LoggerModule,
      ConfigModule.forRoot({
        isGlobal:true,
        validationSchema:Joi.object({
          DATABASE_URI:Joi.string().required(),
          PORT:Joi.number().required(),
          AUTH_HOST:Joi.string().required(),
          PAYMENTS_HOST:Joi.string().required(),
          AUTH_PORT:Joi.number().required(),
          PAYMENTS_PORT:Joi.number().required()
        })
      }),
      ClientsModule.registerAsync([
        {
          name:AUTH_SERVICE,
          useFactory:(configService:ConfigService)=>({
          transport:Transport.TCP,
          options:{
            host:configService.get('AUTH_HOST'),
            port:configService.get('AUTH_PORT')
          },
          
        }),
        inject:[ConfigService]
        },
        {
          name:PAYMENTS_SERVICE,
        useFactory:(configService:ConfigService)=>({
          transport:Transport.TCP,
          options:{
            host:configService.get('PAYMENTS_HOST'),
            port:configService.get('PAYMENTS_PORT')
          },
          
        }),
        inject:[ConfigService]
        }
      ])
 
],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepositry],
})
export class ReservationsModule { }
