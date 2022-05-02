import { InvestigationRequestDto } from './../../investigation-request/dtos/create-invesigationRequest.dto';
import { DiseaseDto } from './../../disease/dtos/disease.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';

export class DiagnosisDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  measuredIn: string;

  @IsNotEmpty()
  @IsNumber()
  investigationRequest: number;

  @ValidateNested({ each: true })
  @Type(() => DiseaseDto)
  disease: DiseaseDto;
}
