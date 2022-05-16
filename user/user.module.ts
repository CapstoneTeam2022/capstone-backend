import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressModule } from '../address/address.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { HealthCenterModule } from '../health-center/health-center.module';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    AddressModule,
    RoleModule,
    HealthCenterModule,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
