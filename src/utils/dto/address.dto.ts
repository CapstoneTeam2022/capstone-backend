import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  subCity: string;

  @IsNotEmpty()
  @IsString()
  zone: string;

  @IsNotEmpty()
  @IsString()
  woreda: string;

  @IsNotEmpty()
  @IsString()
  kebelle: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNo: string;
}
