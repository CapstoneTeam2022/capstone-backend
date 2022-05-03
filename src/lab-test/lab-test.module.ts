import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';

@Module({
  providers: [LabTestService],
  imports: [TypeOrmModule.forFeature([LabTest])],
})
export class LabTestModule {}
