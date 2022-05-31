import { Module } from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { MohEmployeeController } from './moh-employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MohEmployee } from './entities/moh-employee.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MohEmployee]), UserModule],
  controllers: [MohEmployeeController],
  providers: [MohEmployeeService],
  exports: [MohEmployeeService],
})
export class MohEmployeeModule {}
