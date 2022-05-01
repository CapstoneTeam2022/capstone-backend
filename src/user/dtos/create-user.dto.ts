import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/address/dto';
import { RoleDto } from 'src/role/dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  isResearcher: boolean;

  @IsNotEmpty()
  @IsString()
  isAdmin: boolean;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  role: RoleDto;
}
