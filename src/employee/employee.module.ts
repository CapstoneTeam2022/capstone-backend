import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [UserModule],
})
export class EmployeeModule {}
