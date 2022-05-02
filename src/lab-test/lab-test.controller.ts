import { CreateLabResultDto } from './dtos/create-labTest.dto';
import { LabTestService } from './lab-test.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('lab-test')
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @Post()
  addLabTest(@Body() body: CreateLabResultDto) {
    // return this.labTestService.createLabTest(body);
  }
}
