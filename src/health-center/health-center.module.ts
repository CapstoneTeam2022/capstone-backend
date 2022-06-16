import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCenter } from './healthcenter.entity';
import { HealthCenterService } from './health-center.service';
import { HealthCenterController } from './health-center.controller';
import { AddressModule } from '../address/address.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthCenter]),
    AddressModule,
    forwardRef(() => UserModule),
    RoleModule,
  ],
  providers: [HealthCenterService],
  controllers: [HealthCenterController],
  exports: [HealthCenterService],
})
export class HealthCenterModule {}
