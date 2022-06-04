import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
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

  @Get('/refId/:refId')
  getOnePatientByRefId(@Param('refId', new ParseUUIDPipe()) refId: string) {
    return this.patientService.getPatientByRef(refId);
  }

  @Get('/number')
  getAllNum() {
    return this.patientService.getNumOfPatients();
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
