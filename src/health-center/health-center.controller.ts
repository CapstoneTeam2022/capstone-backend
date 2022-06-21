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
import { HealthcenterCheck, HealthCenterDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { HealthCenterWithAdminDto } from './dto/health-center-with-admin.dto';

//@UseGuards(JwtGuard)
@Controller('health-center')
export class HealthCenterController {
  constructor(private readonly service: HealthCenterService) {}

  @Get()
  getAll() {
    return this.service.getAllHealthCenters();
  }

  @Get('/number')
  getAllNum() {
    return this.service.getNumOfHealthCenters();
  }

  // @Get('/employee/count')
  // getEmployeeCount() {
  //   return this.service.getEmployeeCount();
  // }

  @Get(':id')
  getSingleHealthCenter(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.service.getOneHealthCenter(id);
  }

  @Get(':id/admin')
  getAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAdmin(id);
  }

  @Post()
  create(@Body() body: HealthCenterWithAdminDto) {
    // return this.service.createWithTransaction(body);
    return this.service.createHealthCenterWithAdmin(body);
  }

  @Put(':id')
  updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HealthCenterDto,
  ) {
    return this.service.updateHealthCenter(id, body);
  }

  @Post('check')
  healthceterfind(@Body() body: HealthcenterCheck) {
     console.log("heolo")
    return this.service.getHealthcenter(body.healthcenter);
  }

}
