import { AbstractRepositry } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { UserDocument } from "./models/user-schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class  UserRepositry extends AbstractRepositry<UserDocument>{
protected readonly logger = new Logger(UserRepositry.name)
    constructor(@InjectModel(UserDocument.name) userModel:Model<UserDocument>){
        super(userModel)
    }
}