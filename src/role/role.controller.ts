import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';
import { Roles } from '../user/authorization/roles.decorator';
import { Role } from '../user/authorization/role.enum';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRoleById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRole(@Body() role: RoleDto) {
    return this.roleService.addRole(role.name);
  }
}
