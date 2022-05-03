import { Module } from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResult } from './labResult.entity';

@Module({
  providers: [LabResultService],
  imports: [TypeOrmModule.forFeature([LabResult])],
})
export class LabResultModule {}
