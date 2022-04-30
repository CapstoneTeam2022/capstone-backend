import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';

@Module({
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [AddressService],
})
export class AddressModule {}
