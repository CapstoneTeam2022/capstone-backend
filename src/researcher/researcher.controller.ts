import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../user/dto';
import { UserDto } from '../user/dto';
import { Analytics } from './dto/analytics.dto';
import { ResearcherService } from './researcher.service';
import { FileUploadInterceptor } from '../interceptors/fileupload.interceptor';

@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get()
  getAll() {
    return this.researcherService.getAll();
  }

  @Get('/number')
  getAllNum() {
    return this.researcherService.getNumOfResearchers();
  }

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


  @Get('healthcenter/:healthcenter')
  getHealthCenterAnalytics(@Param('healthcenter') healthcenter: string)
  {
    return this.researcherService.getHealthCenterAnalytics(healthcenter);
  }



  @Post('disease')
  getDiseaseAnalytics( @Body() body: Analytics)
  {
    return this.researcherService.getDiseasedPatient(body);
  }

  @Post('medication')
  getMedicationAnalytics( @Body() body: Analytics)
  {
    return this.researcherService.getMedicationAnalytics(body);
  }


}
