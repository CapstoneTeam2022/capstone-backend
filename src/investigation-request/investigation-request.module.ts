import { Module } from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';
import { UserModule } from '../user/user.module';
import { VitalsModule } from '../vitals/vitals.module';
import { InvestigationRequestController } from './investigation-request.controller';

@Module({
  providers: [InvestigationRequestService],
  imports: [
    TypeOrmModule.forFeature([InvestigationRequest]),
    UserModule,
    VitalsModule,
  ],
  controllers: [InvestigationRequestController],
})
export class InvestigationRequestModule {}
