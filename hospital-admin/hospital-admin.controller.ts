import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { UserDto } from '../user/dto';

@Controller('hospital-admin')
export class HospitalAdminController {
  constructor(private hospitalAdminService: HospitalAdminService) {}

  @Get()
  getAll() {
    return this.hospitalAdminService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalAdminService.getById(id);
  }

  @Post()
  create(@Body() body: UserDto) {
    body.isAdmin = true;
    return this.hospitalAdminService.createHospitalAdmin(body);
  }
}
