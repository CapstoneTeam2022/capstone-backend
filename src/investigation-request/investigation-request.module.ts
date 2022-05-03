import { Module } from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';

@Module({
  providers: [InvestigationRequestService]
})
export class InvestigationRequestModule {}
