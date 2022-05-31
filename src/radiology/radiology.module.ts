import { Module } from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radiology } from './radiology.entity';
import { UserModule } from '../user/user.module';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';
import { RadiologyController } from './radiology.controller';

@Module({
  providers: [RadiologyService],
  imports: [
    TypeOrmModule.forFeature([Radiology]),
    UserModule,
    InvestigationRequestModule,
  ],
  controllers: [RadiologyController],
  exports: [RadiologyService],
})
export class RadiologyModule {}
