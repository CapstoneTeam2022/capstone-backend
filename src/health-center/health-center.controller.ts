import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterDto } from './dto';
import { param } from 'express-validator';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterService) {}

  @Get()
  getAll() {
    return this.healthCenterService.getAllHealthCenters();
  }

  @Get(':id')
  getSingleHealthCenter(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.healthCenterService.getOneHealthCenter(id);
  }

  @Post()
  create(@Body() body: HealthCenterDto) {
    return this.healthCenterService.createWithTransaction(body);
  }
  @Put(':id')
  updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HealthCenterDto,
  ) {
    return this.healthCenterService.updateHealthCenter(id, body);
  }
  @Put('/disactive/:id')
  disActiveHealthCenter(@Param('id', ParseIntPipe) id: number) {
    return this.healthCenterService.disActiveHealthCenter(id);
  }
}
