import { Module } from '@nestjs/common';
import { SystemAdminController } from './system-admin.controller';
import { SystemAdminService } from './system-admin.service';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { HealthCenterModule } from '../health-center/health-center.module';
import { ResearcherModule } from '../researcher/researcher.module';
import { PatientModule } from '../patient/patient.module';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';
import { MohEmployeeModule } from '../moh-employee/moh-employee.module';
import { LabResultModule } from '../lab-result/lab-result.module';
import { RadiologyModule } from '../radiology/radiology.module';

@Module({
  controllers: [SystemAdminController],
  providers: [SystemAdminService],
  imports: [
    DiagnosisModule,
    HealthCenterModule,
    ResearcherModule,
    PatientModule,
    InvestigationRequestModule,
    MohEmployeeModule,
    LabResultModule,
    RadiologyModule,
    //  ResearcherModule,
  ],
})
export class SystemAdminModule {}
