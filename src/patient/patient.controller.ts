import { CreateUserDto } from './../user/dtos/create-user.dto';
import { PatientService } from './patient.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  addPatientInfo(@Body() body: CreateUserDto) {
    return this.patientService.addPatient(body);
  }
  @Get()
  getAll() {
    console.log('dlksjfk sdj fksdj ksdjf k');
  }
}
