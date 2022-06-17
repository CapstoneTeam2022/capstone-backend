import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { LabResultDto } from './dto';
import { FileUploadInterceptor } from '../interceptors/fileupload.interceptor';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
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
  //@UseInterceptors(FileUploadInterceptor('./upload/Labresult'))
  create(
    @Body() body: LabResultDto,
    @Req() req: Request /*, @UploadedFile() image*/,
  ) {
    // if (!image) {
    //   throw new BadRequestException('The image is required');
    // }
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal Server Error');
    }
    return this.labResultService.createLabResult(body, user.id, body.image);
  }
}
