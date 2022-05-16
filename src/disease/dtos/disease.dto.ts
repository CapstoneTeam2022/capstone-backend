import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class DiseaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
