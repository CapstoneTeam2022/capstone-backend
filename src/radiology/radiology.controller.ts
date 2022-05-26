import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { RadiologyDto } from './dto';
import { MultipleFileUploadInterceptor } from 'src/interceptors/multiplefileUpload';

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
  @UseInterceptors(MultipleFileUploadInterceptor('./upload/radiology'))
  create(
    @Body() body: RadiologyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (!files) {
      throw new BadRequestException('The image is must required');
    }
    return this.radiologyService.create(body, files);
  }
}
