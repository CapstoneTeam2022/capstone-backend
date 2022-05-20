import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RadiologyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  focalArea: string;

  @IsNotEmpty()
  @IsString()
  report: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  requestedById: number;

  @IsNotEmpty()
  @IsNumber()
  investigationRequestId: number;
}
