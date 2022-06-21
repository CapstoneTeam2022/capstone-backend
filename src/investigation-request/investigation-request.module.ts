import { Module } from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { UserModule } from '../user/user.module';
import { VitalsModule } from '../vitals/vitals.module';
import { InvestigationRequestController } from './investigation-request.controller';
import { LabTestModule } from '../lab-test/lab-test.module';
import { PatientModule } from '../patient/patient.module';
import { LabResult } from '../lab-result/labResult.entity';

@Module({
  providers: [InvestigationRequestService],
  imports: [
    TypeOrmModule.forFeature([InvestigationRequest, LabResult]),
    UserModule,
    VitalsModule,
    LabTestModule,
    PatientModule,
  ],
  controllers: [InvestigationRequestController],
  exports: [InvestigationRequestService],
})
export class InvestigationRequestModule {}
