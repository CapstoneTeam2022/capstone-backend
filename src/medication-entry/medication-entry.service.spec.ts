import { Test, TestingModule } from '@nestjs/testing';
import { MedicationEntryService } from './medication-entry.service';

describe('MedicationEntryService', () => {
  let service: MedicationEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationEntryService],
    }).compile();

    service = module.get<MedicationEntryService>(MedicationEntryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
