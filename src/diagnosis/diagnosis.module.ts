import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnosis } from './entities/diagnosis.entity';
import { UserModule } from '../user/user.module';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';
import { DiseaseModule } from '../disease/disease.module';
import { PatientModule } from '../patient/patient.module';
import { VitalsModule } from '../vitals/vitals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnosis]),
    UserModule,
    InvestigationRequestModule,
    DiseaseModule,
    PatientModule,
    VitalsModule,
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
  exports: [DiagnosisService],
})
export class DiagnosisModule {}
