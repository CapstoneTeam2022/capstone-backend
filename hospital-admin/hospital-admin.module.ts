import { Module } from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { HospitalAdminController } from './hospital-admin.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [HospitalAdminService],
  controllers: [HospitalAdminController],
  imports: [UserModule, RoleModule],
})
export class HospitalAdminModule {}
