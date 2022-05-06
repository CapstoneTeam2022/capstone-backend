import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressModule } from '../address/address.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AddressModule, RoleModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
