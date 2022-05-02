import { LabTest } from './labTest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LabTestController } from './lab-test.controller';
import { LabTestService } from './lab-test.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabTest])],
  controllers: [LabTestController],
  providers: [LabTestService],
})
export class LabTestModule {}
