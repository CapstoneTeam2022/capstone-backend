import { CreateUserDto } from './../../user/dtos/create-user.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  emergencyContactName: string;

  @IsNotEmpty()
  @IsString()
  emergencyContactPhone: string;

  // @IsNotEmpty()
  // @IsNumber()
  // registeredBy: number;

  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  user: CreateUserDto;
}
