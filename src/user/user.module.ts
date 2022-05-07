import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressModule } from '../address/address.module';
import { RoleModule } from '../role/role.module';
import { AuthModule } from 'src/user/auth/auth.module';
import { AuthService } from 'src/user/auth/auth.service';
import { LocalStrategy } from 'src/user/auth/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), AddressModule, RoleModule],
  exports: [UserService]
})
export class UserModule {}
