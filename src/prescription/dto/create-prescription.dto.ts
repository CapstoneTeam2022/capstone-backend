import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMedicationDto } from './create-medication.dto';

export class CreatePrescriptionDto {
  // @IsNotEmpty()
  // @IsString()
  // comment: string;

  @IsNotEmpty()
  @IsNumber()
  diagnosisId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMedicationDto)
  medications: CreateMedicationDto[];

  // @IsArray()
  // @IsString({ each: true })
  // medications: string[];
}
