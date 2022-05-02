import { Test, TestingModule } from '@nestjs/testing';
import { InvestigationRequestController } from './investigation-request.controller';

describe('InvestigationRequestController', () => {
  let controller: InvestigationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestigationRequestController],
    }).compile();

    controller = module.get<InvestigationRequestController>(InvestigationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
