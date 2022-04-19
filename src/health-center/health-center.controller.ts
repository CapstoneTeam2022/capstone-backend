import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
