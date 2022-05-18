import { IsString, IsNotEmpty } from 'class-validator';
export class ExaminationDto {
  @IsString()
  @IsNotEmpty()
  symptom: string;

  @IsString()
  @IsNotEmpty()
  physical_examination: string;
}
