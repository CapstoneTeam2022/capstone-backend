import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';

@Module({
  providers: [LabTestService]
})
export class LabTestModule {}
