import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  // @IsNotEmpty()
  // @IsString()
  // comment: string;

  @IsNotEmpty()
  @IsNumber()
  diagnosisId: number;

  // @IsArray()
  // @IsString({ each: true })
  // medications: string[];
}
