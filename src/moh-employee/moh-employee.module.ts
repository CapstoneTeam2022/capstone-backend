import { Module } from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { MohEmployeeController } from './moh-employee.controller';

@Module({
  controllers: [MohEmployeeController],
  providers: [MohEmployeeService]
})
export class MohEmployeeModule {}
