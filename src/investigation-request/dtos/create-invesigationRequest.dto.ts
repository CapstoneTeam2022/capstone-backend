import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class InvestigationRequestDto {
  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  date: number;
}
