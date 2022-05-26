import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from '../user/dto';
import { DiseaseAnalytics } from './dto/analytics.dto';
import { ResearcherService } from './researcher.service';

@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get()
  getAll() {
    return this.researcherService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.researcherService.getById(id);
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.researcherService.create(body);
  }


  @Get('healthcenter/:healthcenter')
  getHealthCenterAnalytics(@Param('healthcenter') healthcenter: string)
  {
    return this.researcherService.getHealthCenterAnalytics(healthcenter);
  }

  

  @Post('disease')
  getDiseaseAnalytics( @Body() body: DiseaseAnalytics)
  {
    return this.researcherService.getDiseaseAnalytics(body);
  }
  
  @Post('medication')
  getMedicationAnalytics( @Body() body)
  {
    return this.researcherService.getMedicationAnalytics(body);
  }
  

}
