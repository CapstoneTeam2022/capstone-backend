import { InvestigationRequest } from './investigationRequest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InvestigationRequestController } from './investigation-request.controller';
import { InvestigationRequestService } from './investigation-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvestigationRequest])],
  controllers: [InvestigationRequestController],
  providers: [InvestigationRequestService],
})
export class InvestigationRequestModule {}
