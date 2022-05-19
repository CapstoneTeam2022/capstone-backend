import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiagnosisDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  filledById: number;

  @IsNumber()
  @IsNotEmpty()
  investigationRequestId: number;

  @IsNumber({}, { each: true })
  diseases: number[];
}
