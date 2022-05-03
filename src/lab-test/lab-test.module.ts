import { Module } from '@nestjs/common';
import { LabTestService } from './lab-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTest } from './labTest.entity';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';
import { LabTestController } from './lab-test.controller';

@Module({
  providers: [LabTestService],
  imports: [TypeOrmModule.forFeature([LabTest]), InvestigationRequestModule],
  controllers: [LabTestController],
})
export class LabTestModule {}
