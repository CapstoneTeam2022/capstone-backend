import { Module } from '@nestjs/common';
import { LabResultService } from './lab-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResult } from './labResult.entity';
import { UserModule } from '../user/user.module';
import { InvestigationRequestModule } from '../investigation-request/investigation-request.module';
import { LabResultController } from './lab-result.controller';

@Module({
  providers: [LabResultService],
  imports: [
    TypeOrmModule.forFeature([LabResult]),
    UserModule,
    InvestigationRequestModule,
  ],
  controllers: [LabResultController],
})
export class LabResultModule {}
