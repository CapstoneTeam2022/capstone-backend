import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { UserModule } from '../user/user.module';
import { ResearcherController } from './researcher.controller';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { HealthCenterModule } from 'src/health-center/health-center.module';
import { VitalsModule } from 'src/vitals/vitals.module';
import { PatientModule } from 'src/patient/patient.module';
import { ExaminationModule } from 'src/examination/examination.module';
import { DiseaseModule } from 'src/disease/disease.module';
import { InvestigationRequestModule } from 'src/investigation-request/investigation-request.module';

@Module({
  providers: [ResearcherService],
  imports: [
    UserModule,
    DiagnosisModule,
    PrescriptionModule,
    HealthCenterModule,
    VitalsModule,
    PatientModule,
    ExaminationModule,
    DiseaseModule,
    InvestigationRequestModule
  ],
  controllers: [ResearcherController],
})
export class ResearcherModule {}
