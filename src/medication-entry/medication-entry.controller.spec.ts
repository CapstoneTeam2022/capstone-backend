import { Test, TestingModule } from '@nestjs/testing';
import { MedicationEntryController } from './medication-entry.controller';

describe('MedicationEntryController', () => {
  let controller: MedicationEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationEntryController],
    }).compile();

    controller = module.get<MedicationEntryController>(MedicationEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
