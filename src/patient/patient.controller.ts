import { CreatePatientDto } from './dtos/create-patient.dto';
import { CreateUserDto } from './../user/dtos/create-user.dto';
import { PatientService } from './patient.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  addPatientInfo(@Body() body: CreatePatientDto) {
    return this.patientService.addPatient(body);
  }
  @Get()
  getAll() {
    return this.patientService.getAllPatient();
  }
}
