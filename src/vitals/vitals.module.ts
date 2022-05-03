import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vitals } from './vitals.entity';
import { VitalsController } from './vitals.controller';

@Module({
  providers: [VitalsService],
  imports: [TypeOrmModule.forFeature([Vitals])],
  controllers: [VitalsController],
})
export class VitalsModule {}
