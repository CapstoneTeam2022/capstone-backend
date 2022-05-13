import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LabTestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  normalRange: string;

  @IsNotEmpty()
  @IsString()
  measuredIn: string;

  @IsNotEmpty()
  @IsString()
  testCategory: string;

  // @IsNotEmpty()
  // @IsInt()
  // investigationRequestId: number;
}
