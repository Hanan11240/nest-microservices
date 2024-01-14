import { Type } from "class-transformer";
import { IsCreditCard, IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested, isCreditCard } from "class-validator";
import { CardDto } from "@app/common";
import { CreateChargeDto } from "@app/common";

export class CreateReservationDto {
    @IsDate()
    @Type(()=>Date)
    startDate:Date;

    @IsDate()
    @Type(()=>Date)
    endDate:Date;

    @IsString()
    @IsNotEmpty()
    placeId:string;

    @IsString()
    @IsNotEmpty()
    invoiceId:string;

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=> CreateChargeDto)
    charge:CreateChargeDto
}

