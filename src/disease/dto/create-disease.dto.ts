import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiseaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
