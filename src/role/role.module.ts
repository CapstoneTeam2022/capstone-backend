import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';

@Module({
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
})
export class RoleModule {}
