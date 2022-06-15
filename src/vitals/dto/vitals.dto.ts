import { IsNotEmpty, IsNumber } from 'class-validator';

export class VitalsDto {
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  pulse: number;

  @IsNumber()
  @IsNotEmpty()
  respiratoryRate: number;

  @IsNumber()
  @IsNotEmpty()
  bloodPressure: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  spo2Level: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  // @IsNumber()
  // @IsNotEmpty()
  // requestedById: number;
}
