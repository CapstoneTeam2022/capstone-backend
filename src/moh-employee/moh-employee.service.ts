import { Injectable } from '@nestjs/common';
import { CreateMohEmployeeDto } from './dto/create-moh-employee.dto';
import { UpdateMohEmployeeDto } from './dto/update-moh-employee.dto';

@Injectable()
export class MohEmployeeService {
  create(createMohEmployeeDto: CreateMohEmployeeDto) {
    return 'This action adds a new mohEmployee';
  }

  findAll() {
    return `This action returns all mohEmployee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mohEmployee`;
  }

  update(id: number, updateMohEmployeeDto: UpdateMohEmployeeDto) {
    return `This action updates a #${id} mohEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} mohEmployee`;
  }
}
