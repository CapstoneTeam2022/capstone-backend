import { Module } from '@nestjs/common';
import { LabResultService } from './lab-result.service';

@Module({
  providers: [LabResultService],
})
export class LabResultModule {}
