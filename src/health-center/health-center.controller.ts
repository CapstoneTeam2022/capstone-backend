import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HealthCenterDto } from './dto';
import { HealthCenterService } from './health-center.service';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterService) {}

  @Get()
  async getAllHealthCenters() {
    return this.healthCenterService.getAllHealthCenters();
  }

  @Post()
  createHealthCenter(@Body() dto: HealthCenterDto) {
    return this.healthCenterService.createHealthCenter(dto);
  }

  @Get(':id')
  getHealthCenter(@Param('id', ParseIntPipe) id: number) {
    return this.healthCenterService.getHealthCenter(id);
  }
}
