import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepositry } from './reservations.repositry';
import { ReservationDocument, ReservationsSchema } from './models/reservation.schema';
import { LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import  * as Joi from 'joi'
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
          PORT:Joi.number().required()
        })
      })
 
],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepositry],
})
export class ReservationsModule { }
