import { Module } from '@nestjs/common';
import { HealthCenterController } from './health-center.controller';

@Module({
  controllers: [HealthCenterController]
})
export class HealthCenterModule {}
