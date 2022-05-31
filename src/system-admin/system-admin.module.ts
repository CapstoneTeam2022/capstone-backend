import { Module } from '@nestjs/common';
import { SystemAdminController } from './system-admin.controller';

@Module({
  controllers: [SystemAdminController]
})
export class SystemAdminModule {}
