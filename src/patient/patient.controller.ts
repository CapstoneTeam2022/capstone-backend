import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
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

  @Get(':refId')
  getOnePatientByRefId(@Param('refId') refId: string) {
    return this.patientService.getPatientByRef(refId);
  }

  @Post()
  addPatient(@Body() body: PatientDto) {
    return this.patientService.addPatient(body);
  }

  @Delete(':id')
  deletePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.deletePatient(id);
  }
}
