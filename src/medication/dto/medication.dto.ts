import { IsNotEmpty, IsString } from "class-validator";

export class MedicationDto{
    
    @IsNotEmpty()
    @IsString()
    medication: string;
}