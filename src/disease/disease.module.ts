import { Disease } from './disease.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';

@Module({
  imports: [TypeOrmModule.forFeature([Disease])],
  controllers: [DiseaseController],
  providers: [DiseaseService],
  exports: [DiseaseService],
})
export class DiseaseModule {}
