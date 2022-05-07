import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.patientService.getAllPatients();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOnePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.getPatient(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addPatient(@Body() body: PatientDto) {
    return this.patientService.addPatient(body);
  }
}
