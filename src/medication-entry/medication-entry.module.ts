import { Module } from '@nestjs/common';
import { MedicationEntryController } from './medication-entry.controller';
import { MedicationEntryService } from './medication-entry.service';

@Module({
  controllers: [MedicationEntryController],
  providers: [MedicationEntryService]
})
export class MedicationEntryModule {}
