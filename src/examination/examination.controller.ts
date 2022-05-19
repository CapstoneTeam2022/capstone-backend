import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ExaminationService } from './examination.services';
import { ExaminationDto } from './dto/create-examination.dto';

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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examinationService.findOne(id);
  }

  @Get('vital/:id')
  findExaminationForVital(@Param('id', ParseIntPipe) id: number) {
    return this.examinationService.getExaminationForVital(id);
  }
}
