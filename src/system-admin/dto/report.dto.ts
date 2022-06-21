import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';

export enum ReportInfo {
  DIAGNOSIS = 'DIAGNOSIS',
  HOSPITAL = 'HOSPITAL',
  //EMPLOYEE = 'EMPLOYEE',
  RESEARCHER = 'RESEARCHER',
  PATIENT = 'PATIENT',
  INVESTIGATION_REQUEST = 'INVESTIGATION_REQUEST',
  MOH_EMPLOYEE = 'MOH_EMPLOYEE',
  LAB_RESULT = 'LAB_RESULT',
  RADIOLOGY = 'RADIOLOGY',
}

export class ReportDto {

  @IsString()
  @IsDateString()
  start: Date;

  @IsString()
  @IsDateString()
  end: Date;
}
