import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { RadiologyDto } from './dto';
import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';

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
  @UseInterceptors(FileUploadInterceptor('./upload/radiology'))
  create(@Body() body: RadiologyDto) {
    return this.radiologyService.create(body);
  }
}
