import { Module } from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { HospitalAdminController } from './hospital-admin.controller';

@Module({
  providers: [HospitalAdminService],
  controllers: [HospitalAdminController],
})
export class HospitalAdminModule {}
