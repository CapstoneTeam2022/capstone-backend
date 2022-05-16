import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class InvestigationRequestDto {
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
