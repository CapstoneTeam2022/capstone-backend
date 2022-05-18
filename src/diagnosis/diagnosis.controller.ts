import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisService.update(+id, updateDiagnosisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosisService.remove(+id);
  }
}
