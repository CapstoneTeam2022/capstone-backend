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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { FileUploadInterceptor } from '../interceptors/fileupload.interceptor';

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
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  addPatient(@Body() body: PatientDto, @UploadedFile() image) {
    if (!image) {
      throw new BadRequestException('The image is required');
    }
    return this.patientService.addPatient(body, image.path);
  }

  @Delete(':id')
  deletePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.deletePatient(id);
  }
}
