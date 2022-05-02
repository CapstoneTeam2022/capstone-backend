import { IsNotEmpty, IsString } from "class-validator";

export class PrescriptionDto{
    
    @IsNotEmpty()
    @IsString()
    comment: string;
}