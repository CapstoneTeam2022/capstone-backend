import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../address/dto';

export class HealthCenterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;
}
