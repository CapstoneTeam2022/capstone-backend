import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';

@Module({
  providers: [LabTestService],
  imports: [TypeOrmModule.forFeature([LabTest]), InvestigationRequestModule],
})
export class LabTestModule {}
