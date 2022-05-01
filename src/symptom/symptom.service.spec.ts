import { Test, TestingModule } from '@nestjs/testing';
import { SymptomService } from './symptom.service';

describe('SymptomService', () => {
  let service: SymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymptomService],
    }).compile();

    service = module.get<SymptomService>(SymptomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
