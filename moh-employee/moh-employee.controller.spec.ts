import { Test, TestingModule } from '@nestjs/testing';
import { MohEmployeeController } from './moh-employee.controller';
import { MohEmployeeService } from './moh-employee.service';

describe('MohEmployeeController', () => {
  let controller: MohEmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MohEmployeeController],
      providers: [MohEmployeeService],
    }).compile();

    controller = module.get<MohEmployeeController>(MohEmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
