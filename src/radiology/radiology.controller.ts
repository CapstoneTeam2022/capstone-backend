import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { RadiologyDto } from './dto';
import { MultipleFileUploadInterceptor } from '../interceptors/multiplefileUpload';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
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

  @Post()
  create(@Body() body: RadiologyDto) {
    return this.radiologyService.create(body);
  }
}
