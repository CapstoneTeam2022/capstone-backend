import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  getAll() {
    return this.patientService.getAllPatients();
  }

  @Get(':id')
  getOnePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.getPatient(id);
  }

  @Post()
  addPatient(@Body() body: PatientDto) {
    return this.patientService.addPatient(body);
  }
}
