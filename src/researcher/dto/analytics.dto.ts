import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Analytics {
  @IsString()
  @IsNotEmpty()
  healthCenter: string;

  @IsString()
  @IsNotEmpty()
  disease: string;

  @IsInt()
  @IsNotEmpty()
  startAgeGroup: number;

  @IsInt()
  @IsNotEmpty()
  endAgeGroup: number;

  @IsString()
  @IsNotEmpty()
  gender: string;
}
