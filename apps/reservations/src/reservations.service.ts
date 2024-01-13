import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepositry } from './reservations.repositry';

@Injectable()
export class ReservationsService {
  constructor(private readonly  reservationRepositry:ReservationsRepositry){}
  create(createReservationDto: CreateReservationDto,userId:string) {
    return this.reservationRepositry.create({
      ...createReservationDto,
      timestamp:new Date(),
      userId
    })
  }

  findAll() {
    return this.reservationRepositry.find({});
  }

  findOne(_id: string) {
    return this.reservationRepositry.findOne({_id})
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepositry.findOneAndUpdate(
      {_id},
      {$set:updateReservationDto}
      );
  }

  remove(_id: string) {
    return this.reservationRepositry.findOneAndDelete({_id})
  }
}
