import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DiseaseAnalytics {
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

export class MedicationAnalytics {
  @IsString()
  @IsNotEmpty()
  healthCenter: string;

  @IsString()
  @IsNotEmpty()
  medication: string;

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

export class healthCenterAnalytics {
  @IsString()
  @IsNotEmpty()
  healthCenter: string;
}
