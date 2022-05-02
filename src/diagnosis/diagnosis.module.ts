import { InvestigationRequestModule } from './../investigation-request/investigation-request.module';
import { DiseaseModule } from './../disease/disease.module';
import { Diagnosis } from './diagnosis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnosis]),
    DiseaseModule,
    InvestigationRequestModule,
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
