import { Module } from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Radiology } from './radiology.entity';
import { UserModule } from '../user/user.module';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';

@Module({
  providers: [RadiologyService],
  imports: [
    TypeOrmModule.forFeature([Radiology]),
    UserModule,
    InvestigationRequestModule,
  ],
})
export class RadiologyModule {}
