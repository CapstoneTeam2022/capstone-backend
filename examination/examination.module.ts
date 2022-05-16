import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';
import { Examination } from './entities/examination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Examination])],
  controllers: [ExaminationController],
  providers: [ExaminationService]
})
export class ExaminationModule {}
