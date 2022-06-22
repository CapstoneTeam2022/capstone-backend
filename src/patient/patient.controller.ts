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
  Req,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { Roles } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  getAll() {
    return this.patientService.getAllPatients();
  }

  @UseGuards(RolesGuard)
  @Roles('Patient')
  @Get('user/profile')
  getProfile(@Req() request: Request) {
    const user = request.user as User;
    return this.patientService.getUser(user.id);
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
