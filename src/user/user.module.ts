import { RoleService } from './../role/role.service';
import { AddressService } from './../address/address.service';
import { RoleModule } from './../role/role.module';
import { AddressModule } from './../address/address.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AddressModule, RoleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
