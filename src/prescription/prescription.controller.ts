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
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto';
import { UpdatePrescriptionDto } from './dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prescriptionService.findOne(id);
  }

  @Get('diagnosis/:id')
  getAllForDiagnosis(@Param('id', ParseIntPipe) id: number) {
    return this.prescriptionService.findAllForDiagnosis(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  // ) {
  //   return this.prescriptionService.update(+id, updatePrescriptionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.prescriptionService.remove(+id);
  // }
}
