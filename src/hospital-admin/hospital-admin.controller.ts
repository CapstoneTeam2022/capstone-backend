import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { UserDto } from '../user/dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
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
  //@UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(@Body() body: UserDto) {
    body.isAdmin = true;
    // if (!image) {
    //   throw new BadRequestException('The image is required');
    // }
    return this.hospitalAdminService.createHospitalAdmin(body);
  }

  @Post('/employees')
  getALlEmployees(@Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      console.error('no authenticated user');
      throw new InternalServerErrorException('Internal server error');
    }
    return this.hospitalAdminService.findAllEmployeesForHospitalAdmin(user.id);
  }

  // @Post('/employees/:id')
  // getALlEmployeesById(
  //   @Param('id', ParseIntPipe) id: number,
  // ) {
  //   return this.hospitalAdminService.findAllEmployeesForHospitalAdmin(id);
  // }
}
