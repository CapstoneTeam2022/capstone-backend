import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLabTestDto {
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

  @IsNotEmpty()
  @IsNumber()
  investigationRequest: number;
}
