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

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly service: HealthCenterService) {}

  @Get()
  getAll() {
    return this.service.getAllHealthCenters();
  }

  @Get(':id')
  getSingleHealthCenter(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.service.getOneHealthCenter(id);
  }

  @Post()
  create(@Body() body: HealthCenterDto) {
    return this.service.createWithTransaction(body);
  }

  @Put(':id')
  updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HealthCenterDto,
  ) {
    return this.service.updateHealthCenter(id, body);
  }
}
