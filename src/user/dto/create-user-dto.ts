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
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

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
  @IsBoolean()
  isResearcher: boolean;

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

  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // @IsNotEmpty()
  // role: Role;
}
