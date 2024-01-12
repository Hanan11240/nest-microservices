import { AbstractRepositry } from "@app/common";

import { ReservationDocument } from "./models/reservation.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ReservationsRepositry extends AbstractRepositry<ReservationDocument>{
    protected readonly logger = new Logger(ReservationsRepositry.name);
    
    constructor(@InjectModel(ReservationDocument.name) reservationModel:Model<ReservationDocument>){
        super(reservationModel)
    }
}