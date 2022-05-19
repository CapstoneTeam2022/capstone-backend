import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { LabTestDto } from './dto';

@Controller('lab-test')
export class LabTestController {
  constructor(private labTestService: LabTestService) {}

  @Get()
  getAll() {
    return this.labTestService.getAllLabTests();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labTestService.getLabTest(id);
  }

  @Get()
  getAllByIds(@Param('ids', ParseIntPipe) ids: number[]) {
    return this.labTestService.findAllByIds(ids);
  }

  @Post()
  create(@Body() body: LabTestDto) {
    return this.labTestService.createLabTest(body);
  }
}
