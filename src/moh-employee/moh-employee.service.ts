import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMohEmployeeDto } from './dto/create-moh-employee.dto';
import { UpdateMohEmployeeDto } from './dto/update-moh-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MohEmployee } from './entities/moh-employee.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class MohEmployeeService {
  constructor(
    @InjectRepository(MohEmployee)
    private mohEmployeeRepository: Repository<MohEmployee>,
    private userService: UserService,
  ) {}

  async create({ user, registeredBy, ...data }: CreateMohEmployeeDto) {
    const newUser = await this.userService.addUser(user, 'MohEmployee');
    const registerer = await this.userService.getUser(registeredBy);
    const mohEmployee = this.mohEmployeeRepository.create({
      ...data,
      user: newUser,
      registeredBy: registerer,
    });
    return this.mohEmployeeRepository.save(mohEmployee);
  }

  findAll() {
    return this.mohEmployeeRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const mohEmployee = await this.mohEmployeeRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (mohEmployee) return mohEmployee;
    throw new NotFoundException(`MohEmployee with id ${id} not found`);
  }

  update(id: number, updateMohEmployeeDto: UpdateMohEmployeeDto) {
    return `This action updates a #${id} mohEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} mohEmployee`;
  }

  async getNumOfMohEmployees() {
    const num =  (await this.mohEmployeeRepository.find()).length;
    
  }
}
