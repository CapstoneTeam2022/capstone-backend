import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosisService.findOne(id);
  }

  @Get('/invRequest/:id')
  findAllForInvestigationRequest(@Param('id') id: number) {
    return this.diagnosisService.findAllForInvestigationRequest(id);
  }

  @Get('/patient/:id')
  findAllForPatient(@Param('id') id: number) {
    return this.diagnosisService.findAllForPatient(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
  //   return this.diagnosisService.update(+id, updateDiagnosisDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.diagnosisService.remove(+id);
  // }
}
