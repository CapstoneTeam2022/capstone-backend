import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UploadedFile
  ,BadRequestException
} from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { LabResultDto } from './dto';

@Controller('lab-result')
export class LabResultController {
  constructor(private labResultService: LabResultService) {}

  @Get()
  getAll() {
    return this.labResultService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labResultService.getLabResult(id);
  }

  @Post()
  @UseInterceptors(FileUploadInterceptor("./upload/Labresult"))
  create(@Body() body: LabResultDto,@UploadedFile() image) {
    if(!image){
      throw new BadRequestException("The image is must required");
    }
    return this.labResultService.createLabResult(body,image.path);
  }
}
