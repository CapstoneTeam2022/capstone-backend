import { Module } from '@nestjs/common';
import { RadiologyService } from './radiology.service';

@Module({
  providers: [RadiologyService],
})
export class RadiologyModule {}
