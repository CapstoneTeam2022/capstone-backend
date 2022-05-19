import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class ExaminationDto {
  @IsString()
  @IsNotEmpty()
  symptom: string;

  @IsString()
  @IsNotEmpty()
  physical_examination: string;

  @IsNumber()
  @IsNotEmpty()
  vitalId: number;
}
