import { Module } from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { UserModule } from '../user/user.module';
import { VitalsModule } from '../vitals/vitals.module';

@Module({
  providers: [InvestigationRequestService],
  imports: [
    TypeOrmModule.forFeature([InvestigationRequest]),
    UserModule,
    VitalsModule,
  ],
})
export class InvestigationRequestModule {}
