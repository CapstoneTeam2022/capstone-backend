import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
export class VitalsDto{
 
  @IsNotEmpty()
  @IsInt()
  temperature: number;

  @IsNotEmpty()
  @IsInt()
  pulse: number;

  @IsNotEmpty()
  @IsInt()
  respiratoryRate: number;

  @IsNotEmpty()
  @IsInt()
  bloodPressure: number;

  @IsNotEmpty()
  @IsInt()
  weight: number;

  @IsNotEmpty()
  @IsInt()
    spo2Level: number;
  
  @IsNotEmpty()
//   @IsDate()
  requestedDate: String;

//   @IsDate()
  @IsNotEmpty()
  filledDate: String;
}