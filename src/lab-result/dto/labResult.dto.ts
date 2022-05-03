import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  @IsBoolean()
  isAbnormal: boolean;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsInt()
  filledById: number;

  @IsNotEmpty()
  @IsInt()
  investigationRequestId: number;
}
