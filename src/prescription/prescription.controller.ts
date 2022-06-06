import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto';
import { Response } from 'express';
import { JwtGuard } from '../auth/guard';


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

  @Get('export/pdf/:id')
  async getPDF(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const buffer = await this.prescriptionService.generatePDF(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
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
