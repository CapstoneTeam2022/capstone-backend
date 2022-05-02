import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressModule } from '../address/address.module';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AddressModule, RoleModule],
})
export class UserModule {}
