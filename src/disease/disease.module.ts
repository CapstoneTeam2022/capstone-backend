import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disease])],
  controllers: [DiseaseController],
  providers: [DiseaseService],
})
export class DiseaseModule {}
