import { Injectable, NotFoundException } from '@nestjs/common';
import { MohEmployee } from './entities/moh-employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MohEmployeeDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MohEmployeeService {
  constructor(
    @InjectRepository(MohEmployee)
    private mohEmployeeRepository: Repository<MohEmployee>,
    private userService: UserService,
  ) {}

  getAllMohEmployees(): Promise<MohEmployee[]> {
    return this.mohEmployeeRepository.find({
      relations: ['user'],
    });
  }

  async getMohEmployee(id: number): Promise<MohEmployee> {
    const mohEmployee = await this.mohEmployeeRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (mohEmployee) return mohEmployee;
    throw new NotFoundException(`MohEmployee with id ${id} not found`);
  }

  async addMohEmployee({ user, registeredBy, ...data }: MohEmployeeDto) {
    //Pass the mohEmployee role here
    const newUser = await this.userService.addUser(user, 'MohEmployee');
    const registerer = await this.userService.getUser(registeredBy);
    const mohEmployee = this.mohEmployeeRepository.create({
      ...data,
      user: newUser,
      registeredBy: registerer,
    });
    return this.mohEmployeeRepository.save(mohEmployee);
  }

  async deleteMohEmployee(id: number) {
    const mohEmployee = await this.getMohEmployee(id);
    const user = await this.userService.getUser(mohEmployee.user.id);
    await this.mohEmployeeRepository.delete(mohEmployee.id);
    await this.userService.deleteUser(user.id);
    return {
      msg: 'success',
    };
  }
}
