import { Exclude, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto';
import { Role } from '../../role/role.entity';
import { RoleDto } from '../../role/dto';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
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

  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // @IsNotEmpty()
  // role: Role;
}
