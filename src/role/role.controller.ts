import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';

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
