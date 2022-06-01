import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  subCity: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  zone: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  woreda: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  kebelle: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  street: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  houseNo: string;
}
