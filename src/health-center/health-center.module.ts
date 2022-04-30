import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCenter } from './healthcenter.entity';
import { HealthCenterService } from './health-center.service';
import { HealthCenterController } from './health-center.controller';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([HealthCenter]), AddressModule],
  providers: [HealthCenterService],
  controllers: [HealthCenterController],
})
export class HealthCenterModule {}
