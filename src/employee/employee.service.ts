import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class EmployeeService {
  constructor(private userService: UserService) {}
  create() {
    return 'This action adds a new employee';
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
