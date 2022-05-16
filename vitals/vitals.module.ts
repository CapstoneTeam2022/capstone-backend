import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';
import { VitalsController } from './vitals.controller';
import { UserModule } from '../user/user.module';
import { PatientModule } from '../patient/patient.module';

@Module({
  providers: [VitalsService],
  imports: [TypeOrmModule.forFeature([Vitals]), UserModule, PatientModule],
  controllers: [VitalsController],
  exports: [VitalsService],
})
export class VitalsModule {}
