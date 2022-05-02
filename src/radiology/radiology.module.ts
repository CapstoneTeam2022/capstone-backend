import { InvestigationRequestModule } from './../investigation-request/investigation-request.module';
import { Radiology } from './radiology.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RadiologyController } from './radiology.controller';
import { RadiologyService } from './radiology.service';

@Module({
  imports: [TypeOrmModule.forFeature([Radiology]), InvestigationRequestModule],
  controllers: [RadiologyController],
  providers: [RadiologyService],
})
export class RadiologyModule {}
