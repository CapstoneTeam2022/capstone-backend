import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { UserModule } from '../user/user.module';
import { ResearcherController } from './researcher.controller';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { HealthCenterModule } from 'src/health-center/health-center.module';
import { VitalsModule } from 'src/vitals/vitals.module';

@Module({
  providers: [ResearcherService],
  imports: [UserModule, DiagnosisModule, PrescriptionModule,HealthCenterModule, VitalsModule],
  controllers: [ResearcherController],
  exports: [ResearcherService],
})
export class ResearcherModule {}
