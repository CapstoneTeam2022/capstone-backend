import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.services';
import { ExaminationController } from './examination.controller';
import { Examination } from './entities/examination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalsModule } from '../vitals/vitals.module';
@Module({
  imports: [TypeOrmModule.forFeature([Examination]), VitalsModule],
  controllers: [ExaminationController],
  providers: [ExaminationService],
  exports:[ExaminationService]
})
export class ExaminationModule {}
