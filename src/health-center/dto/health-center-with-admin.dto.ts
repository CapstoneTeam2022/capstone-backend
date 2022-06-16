import { HealthCenterDto } from './health-center.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '../../address/dto';

export class HealthCenterAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;
}

export class HealthCenterWithAdminDto extends HealthCenterDto {
  @ValidateNested({ each: true })
  @Type(() => HealthCenterAdminDto)
  @IsNotEmpty()
  admin: HealthCenterAdminDto;
}
