import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { LabTestDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('lab-test')
export class LabTestController {
  constructor(private labTestService: LabTestService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.labTestService.getAllLabTests();
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labTestService.getLabTest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: LabTestDto) {
    return this.labTestService.createLabTest(body);
  }
}
