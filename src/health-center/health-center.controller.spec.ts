import { Test, TestingModule } from '@nestjs/testing';
import { HealthCenterController } from './health-center.controller';

describe('HealthCenterController', () => {
  let controller: HealthCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCenterController],
    }).compile();

    controller = module.get<HealthCenterController>(HealthCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
