import { Test, TestingModule } from '@nestjs/testing';
import { RadiologyService } from './radiology.service';

describe('RadiologyService', () => {
  let service: RadiologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadiologyService],
    }).compile();

    service = module.get<RadiologyService>(RadiologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
