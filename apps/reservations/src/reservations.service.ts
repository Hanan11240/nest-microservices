import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepositry } from './reservations.repositry';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { UserDocument } from 'apps/auth/src/users/models/user-schema';

@Injectable()
export class ReservationsService {
  constructor(private readonly  reservationRepositry:ReservationsRepositry,@Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy){}
 async create(createReservationDto: CreateReservationDto,{email,_id:userId}:UserDto) {
 return  this.paymentService.send('create_charge',{...createReservationDto.charge,email}).pipe(map(
    async()=>{
    
      return  this.reservationRepositry.create({
        ...createReservationDto,
        timestamp:new Date(),
        userId
      })
    })
  ) 
   
  }

async  findAll() {
    return this.reservationRepositry.find({});
  }

async findOne(_id: string) {
    return this.reservationRepositry.findOne({_id})
  }

async  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepositry.findOneAndUpdate(
      {_id},
      {$set:updateReservationDto}
      );
  }

async  remove(_id: string) {
    return this.reservationRepositry.findOneAndDelete({_id})
  }
}
