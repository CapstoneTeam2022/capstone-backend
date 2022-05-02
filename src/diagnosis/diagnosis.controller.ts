import { DiagnosisDto } from './dtos/create-diagnosis.dto';
import { DiagnosisService } from './diagnosis.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  create(@Body() body: DiagnosisDto) {
    return this.diagnosisService.addDiagnosis(body);
  }

  @Get()
  getAll() {
    return this.diagnosisService.getAllDiagnosis();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosisService.getDiagnosis(id);
  }
}
