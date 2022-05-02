import { InvestigationRequestDto } from './../../investigation-request/dtos/create-invesigationRequest.dto';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RadiologyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  orderedDate: number;

  @IsNotEmpty()
  @IsNumber()
  filledDate: number;

  @IsNotEmpty()
  @IsNumber()
  images: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  report: string;

  @IsNotEmpty()
  @IsString()
  focalarea: string;

  @ValidateNested({ each: true })
  @Type(() => InvestigationRequestDto)
  investigationRequest: InvestigationRequestDto;
}
