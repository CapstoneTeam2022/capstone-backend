import { Module } from '@nestjs/common';
import { HealthCenterController } from './health-center.controller';
import { HealthCenterService } from './health-center.service';

@Module({
  controllers: [HealthCenterController],
  providers: [HealthCenterService],
})
export class HealthCenterModule {}
