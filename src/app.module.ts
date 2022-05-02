import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { HealthCenterModule } from './health-center/health-center.module';
import { RoleModule } from './role/role.module';
import { PatientModule } from './patient/patient.module';
import { VitalsModule } from './vitals/vitals.module';
import { InvestigationRequestModule } from './investigation-request/investigation-request.module';
import { LabTestModule } from './lab-test/lab-test.module';
import { LabResultModule } from './lab-result/lab-result.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { SymptomModule } from './symptom/symptom.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { MedicationEntryModule } from './medication-entry/medication-entry.module';
import { DiseaseModule } from './disease/disease.module';
import { RadiologyModule } from './radiology/radiology.module';
import dbConfig from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AddressModule,
    UserModule,
    HealthCenterModule,
    RoleModule,
    PatientModule,
    VitalsModule,
    InvestigationRequestModule,
    LabTestModule,
    LabResultModule,
    PrescriptionModule,
    SymptomModule,
    DiagnosisModule,
    MedicationEntryModule,
    DiseaseModule,
    RadiologyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
