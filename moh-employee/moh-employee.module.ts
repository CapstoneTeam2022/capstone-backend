import { Module } from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { MohEmployeeController } from './moh-employee.controller';
import { MohEmployee } from './entities/moh-employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MohEmployee]), UserModule],
  controllers: [MohEmployeeController],
  providers: [MohEmployeeService]
})
export class MohEmployeeModule {}
