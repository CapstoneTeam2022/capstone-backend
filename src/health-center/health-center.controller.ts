import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HealthCenterService } from './health-center.service';
import { HealthCenterDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly service: HealthCenterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.service.getAllHealthCenters();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getSingleHealthCenter(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.service.getOneHealthCenter(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: HealthCenterDto) {
    return this.service.createWithTransaction(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HealthCenterDto,
  ) {
    return this.service.updateHealthCenter(id, body);
  }
}
