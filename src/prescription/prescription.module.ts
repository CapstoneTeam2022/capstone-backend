import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';

@Module({
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  imports: [TypeOrmModule.forFeature([Prescription]), DiagnosisModule],
})
export class PrescriptionModule {}
