import { Test, TestingModule } from '@nestjs/testing';
import { MohEmployeeService } from './moh-employee.service';

describe('MohEmployeeService', () => {
  let service: MohEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MohEmployeeService],
    }).compile();

    service = module.get<MohEmployeeService>(MohEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
