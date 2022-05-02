import { CreateLabTestDto } from './dtos/create-labTest.dto';
import { LabTestService } from './lab-test.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('lab-test')
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @Post()
  addLabTest(@Body() body: CreateLabTestDto) {
    return this.labTestService.createLabTest(body);
  }

  @Get()
  getAll() {
    return this.labTestService.getAllLabTest();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.labTestService.getLabTest(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateLabTestDto,
  ) {
    return this.labTestService.updateLabTest(id, body);
  }
}
