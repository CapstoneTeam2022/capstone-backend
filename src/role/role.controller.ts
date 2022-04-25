import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleService } from './role.service';

class RoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRoleById(id);
  }

  @Post()
  createRole(@Body() role: RoleDto) {
    return this.roleService.addRole(role.name);
  }
}
