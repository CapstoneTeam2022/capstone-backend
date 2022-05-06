import { Module } from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { HospitalAdminController } from './hospital-admin.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [HospitalAdminService],
  controllers: [HospitalAdminController],
  imports: [UserModule],
})
export class HospitalAdminModule {}
