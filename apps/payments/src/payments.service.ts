import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { NOTIFICATIONS_SERVICES } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
private readonly  stripe= new Stripe(this.configService.get('SECRET_KEY'),{
  apiVersion:"2023-10-16"
});

constructor(private readonly configService:ConfigService,@Inject(NOTIFICATIONS_SERVICES) private readonly noticationsService:ClientProxy ){}

  async createCharge({amount,email}:PaymentsCreateChargeDto){
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      confirm: true,
      payment_method: 'pm_card_visa',
      currency: 'usd',
    });
    this.noticationsService.emit('notify_email',{email,text:`Your paymet of ${amount * 100} has completed successfully`})
   return paymentIntent
  }
}
