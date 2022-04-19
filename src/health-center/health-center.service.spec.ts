import { Test, TestingModule } from '@nestjs/testing';
import { HealthCenterService } from './health-center.service';

describe('HealthCenterService', () => {
  let service: HealthCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCenterService],
    }).compile();

    service = module.get<HealthCenterService>(HealthCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
