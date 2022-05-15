import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RolesGuard } from '../user/authorization/roles.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
