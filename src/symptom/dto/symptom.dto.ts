import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class SymptomsDto{
  

    @IsNotEmpty()
    @IsString()
    symptoms: string;

    @IsNotEmpty()
    @IsString()
    physicalExaminations: string;


}