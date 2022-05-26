import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto';

export class CreateUserWithRoleDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

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

  

  // @IsNotEmpty()
  @IsBoolean()
  isResearcher = false;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  healthCenterId: number;

  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // @IsNotEmpty()
  // role: Role;
}
