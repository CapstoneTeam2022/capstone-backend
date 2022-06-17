import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import {
  StringToBooleanTransformer,
  StringToNumberTransformer,
} from '../../transformers';

export class LabResultDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(StringToBooleanTransformer)
  isAbnormal: boolean;

  @IsNotEmpty()
  @IsString()
  comment: string;

  // @IsNotEmpty()
  // @IsInt()
  // @Transform(StringToNumberTransformer)
  // filledById: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(StringToNumberTransformer)
  investigationRequestId: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(StringToNumberTransformer)
  labTestId: number;
}
