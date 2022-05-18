import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExaminationService } from './examination.services';
import { ExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';

@Controller('examination')
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @Post()
  create(@Body() examinationDto: ExaminationDto) {
    return this.examinationService.create(examinationDto);
  }

  @Get()
  findAll() {
    return this.examinationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examinationService.findOne(+id);
  }
}
