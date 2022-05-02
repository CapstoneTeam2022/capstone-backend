import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { UserModule } from './../user/user.module';
import { Patient } from './patient.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), UserModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
