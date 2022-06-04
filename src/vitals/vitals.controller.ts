import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalsDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('vitals')
export class VitalsController {
  constructor(private vitalsService: VitalsService) {}

  @Get()
  getAll() {
    return this.vitalsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.getVital(id);
  }

  @Get('/patient/:id')
  getAllForPatient(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.getAllForPatient(id);
  }

  @Post()
  create(@Body() body: VitalsDto) {
    return this.vitalsService.createVital(body);
  }
}
