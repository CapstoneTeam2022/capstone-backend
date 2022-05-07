import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [UserService],
})
export class EmployeeModule {}
