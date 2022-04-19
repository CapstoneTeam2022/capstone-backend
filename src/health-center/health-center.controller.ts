import { Controller, Get } from '@nestjs/common';
import { HealthCenterService } from './health-center.service';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterService) {}

  @Get()
  async getAllHealthCenters() {
    return this.healthCenterService.getAllHealthCenters();
  }
}
