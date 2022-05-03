import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { LabResultDto } from './dto';

@Controller('lab-result')
export class LabResultController {
  constructor(private labResultService: LabResultService) {}

  @Get()
  getAll() {
    return this.labResultService.getAll();
  }

  @Get('id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labResultService.getLabResult(id);
  }

  @Post()
  create(@Body() body: LabResultDto) {
    return this.labResultService.createLabResult(body);
  }
}
