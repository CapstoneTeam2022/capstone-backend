import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { RadiologyDto } from './dto';
import { MultipleFileUploadInterceptor } from '../interceptors/multiplefileUpload';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard, RolesGuard)
@Controller('radiology')
export class RadiologyController {
  constructor(private radiologyService: RadiologyService) {}

  @Get()
  getAll() {
    return this.radiologyService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.radiologyService.getOne(id);
  }

  @Roles('Radiologist')
  @Post()
  create(@Body() body: RadiologyDto, @Req() request: Request) {
    const user = request.user as User;
    return this.radiologyService.create(body, user.id);
  }
}
