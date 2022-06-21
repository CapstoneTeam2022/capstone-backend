import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { StringToNumberTransformer } from '../../transformers';

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

  @IsNotEmpty()
  @IsString()
  image: string;

  // @IsArray()
  // @IsString({ each: true })
  // images: string[];

  @IsNotEmpty()
  @IsString()
  comment: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @Transform(StringToNumberTransformer)
  // filledById: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(StringToNumberTransformer)
  investigationRequestId: number;
}
