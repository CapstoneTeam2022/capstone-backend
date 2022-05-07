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

export class LoginDto {


  @IsNotEmpty()
  @IsString()
  password: string;

  

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;



 
}
