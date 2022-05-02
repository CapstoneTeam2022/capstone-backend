import { Test, TestingModule } from '@nestjs/testing';
import { RadiologyController } from './radiology.controller';

describe('RadiologyController', () => {
  let controller: RadiologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiologyController],
    }).compile();

    controller = module.get<RadiologyController>(RadiologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
