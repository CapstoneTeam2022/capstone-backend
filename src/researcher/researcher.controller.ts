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
import { UpdateUserDto, UserDto } from '../user/dto';
import {  DiseaseAnalytics, healthCenterAnalytics, MedicationAnalytics } from './dto/analytics.dto';
import { ResearcherService } from './researcher.service';
import { JwtGuard } from '../auth/guard';

// @UseGuards(JwtGuard)
@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get()
  getAll() {
    return this.researcherService.getAll();
  }

  @Get('patientRecord')
  getPatientRecord() {
    return this.researcherService.getPatientRecord();
  }

  @Get('userRecord')
  getUserRecord() {
    return this.researcherService.getUserRecord();
  }

  @Get('recordCounts')
  getRecordCounts() {
    return this.researcherService.counts();
  }

  // @Get('/number')
  // getAllNum() {
  //   return this.researcherService.getNumOfResearchers();
  // }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.researcherService.getById(id);
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.researcherService.create(body);
  }

  @Put(':id')
  updateResearcher(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.researcherService.updateResearcher(id, body);
  }

  @Post('healthcenter')
  getHealthCenterAnalytics(@Body() body: healthCenterAnalytics) {
    return this.researcherService.getHealthCenterAnalytics(body.healthCenter);
  }

  @Post('disease')
  getDiseaseAnalytics(@Body() body: DiseaseAnalytics) {
    return this.researcherService.getDiseasedPatient(body);
  }

  @Post('medication')
  getMedicationAnalytics(@Body() body: MedicationAnalytics) {
    return this.researcherService.getMedicationAnalytics(body);
  }
}
