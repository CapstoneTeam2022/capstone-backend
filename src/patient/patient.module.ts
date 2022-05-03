import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { UserModule } from '../user/user.module';
import { PatientController } from './patient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), UserModule],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
