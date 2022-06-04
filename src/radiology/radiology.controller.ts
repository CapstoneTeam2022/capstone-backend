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
  @UseInterceptors(MultipleFileUploadInterceptor('./upload/radiology'))
  create(
    @Body() body: RadiologyDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    if (!images) {
      throw new BadRequestException('The images are required');
    }
    return this.radiologyService.create(
      body,
      images.map((file) => file.path),
    );
  }
}
