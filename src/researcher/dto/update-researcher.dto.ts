//Same as UserDto but without role b/c role can't be changed
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { AddressDto } from '../../address/dto';

export class UpdateResearcherDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  //@IsNotEmpty()
  @IsOptional()
  @IsString()
  //
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
  @IsString()
  gender: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;
}
