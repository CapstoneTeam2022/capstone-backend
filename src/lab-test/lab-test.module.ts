import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';
import { LabTestController } from './lab-test.controller';

@Module({
  providers: [LabTestService],
  imports: [TypeOrmModule.forFeature([LabTest])],
  controllers: [LabTestController],
  exports: [LabTestService],
})
export class LabTestModule {}
