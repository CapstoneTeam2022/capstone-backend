import { Module } from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigationRequest } from './investigationRequest.entity';

@Module({
  providers: [InvestigationRequestService],
  imports: [TypeOrmModule.forFeature([InvestigationRequest])],
})
export class InvestigationRequestModule {}
