import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Analytics {
  @IsString()
  @IsNotEmpty()
  healthCenter: string;

  @IsString()
  @IsNotEmpty()
  disease: string;

  @IsString()
  @IsNotEmpty()
  medication: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;
    
  @IsString()
  @IsNotEmpty()
  endDate: string;


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

