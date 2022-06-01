import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressController } from './address.controller';

@Module({
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
