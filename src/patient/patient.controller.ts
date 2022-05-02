import { CreatePatientDto } from './dtos/create-patient.dto';
import { CreateUserDto } from './../user/dtos/create-user.dto';
import { PatientService } from './patient.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

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
  @Get(':id')
  getOnePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.getPatientInfo(id);
  }

  @Put(':id')
  updatePatient(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.patientService.updatePatientInfo(id, body);
  }
}
