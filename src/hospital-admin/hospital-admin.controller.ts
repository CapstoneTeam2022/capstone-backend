import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HospitalAdminService } from './hospital-admin.service';
import { UserDto } from '../user/dto';
import { JwtGuard } from '../auth/guard';

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
}
