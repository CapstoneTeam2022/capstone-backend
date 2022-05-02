import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseService } from './disease.service';

describe('DiseaseService', () => {
  let service: DiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseaseService],
    }).compile();

    service = module.get<DiseaseService>(DiseaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
