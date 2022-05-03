import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class InvestigationRequest {
  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsInt()
  vitalId: number;

  @IsNotEmpty()
  @IsInt()
  registeredById: number;
}
