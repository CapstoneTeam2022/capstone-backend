import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterDto } from './dto';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly service: HealthCenterService) {}

  @Get()
  getAll() {
    return this.service.getAllHealthCenters();
  }

  @Post()
  create(@Body() body: HealthCenterDto) {
    return this.service.createWithTransaction(body);
  }
}
