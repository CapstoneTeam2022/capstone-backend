import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/address/dto';
import { BadRequestException } from '@nestjs/common';
import {
  StringToBooleanTransformer,
  StringToNumberTransformer,
} from '../../transformers';

export class CreateUserWithRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(StringToNumberTransformer)
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  // @IsNotEmpty()
  @IsBoolean()
  isResearcher = false;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(StringToBooleanTransformer)
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
  @Transform(({ value }) => {
    const isNumeric = !isNaN(value);
    if (isNumeric) return Number(value);
    throw new BadRequestException('expected number');
  })
  healthCenterId: number;

  // @ValidateNested({ each: true })
  // @Type(() => RoleDto)
  // @IsNotEmpty()
  // role: Role;
}
