import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';

@Module({
  providers: [VitalsService],
  imports: [TypeOrmModule.forFeature([Vitals])],
})
export class VitalsModule {}
