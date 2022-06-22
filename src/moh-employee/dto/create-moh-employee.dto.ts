import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from '../../user/dto';
import { AddressDto } from '../../address/dto';

export class MohUserDto {
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

  // @IsBoolean()
  // isResearcher = false;

  @IsString()
  image: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // isAdmin = false;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @IsNotEmpty()
  @IsNumber()
  healthCenterId: number;

  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // @IsNotEmpty()
  // role: Role;
}

export class CreateMohEmployeeDto {
  // @IsNotEmpty()
  // @IsString()
  // emergencyContactName: string;
  //
  // @IsNotEmpty()
  // @IsString()
  // emergencyContactPhone: string;

  // @IsNotEmpty()
  // @IsNumber()
  // registeredBy: number;

  @ValidateNested({ each: true })
  @Type(() => MohUserDto)
  @IsNotEmpty()
  user: MohUserDto;
}
