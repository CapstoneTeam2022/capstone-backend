import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { LabResultDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('lab-result')
export class LabResultController {
  constructor(private labResultService: LabResultService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.labResultService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labResultService.getLabResult(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: LabResultDto) {
    return this.labResultService.createLabResult(body);
  }
}
