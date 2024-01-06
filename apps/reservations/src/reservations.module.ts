import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from '@app/common';
import { ReservationsRepositry } from './reservations.repositry';
import { ReservationDocument, ReservationsSchema } from './models/reservation.schema';

@Module({
  imports:[DatabaseModule,DatabaseModule.forFeature([{name:ReservationDocument.name,schema:ReservationsSchema}])],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationsRepositry],
})
export class ReservationsModule {}
