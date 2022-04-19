import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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

  @Put(':id')
  async updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: HealthCenterDto,
  ) {
    return this.healthCenterService.updateHealthCenter(id, dto);
  }

  @Delete(':id')
  async deleteHealthCenter(@Param('id', ParseIntPipe) id: number) {
    return this.healthCenterService.deleteHealthCenter(id);
  }
}
