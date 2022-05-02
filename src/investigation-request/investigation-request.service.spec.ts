import { Test, TestingModule } from '@nestjs/testing';
import { InvestigationRequestService } from './investigation-request.service';

describe('InvestigationRequestService', () => {
  let service: InvestigationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestigationRequestService],
    }).compile();

    service = module.get<InvestigationRequestService>(InvestigationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
