import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

@Injectable()
export class EmployeeService {
  readonly roleName = 'employee';

  constructor(private userService: UserService) {}

  create(user: UserDto) {
    return this.userService.addUser(user, this.roleName);
  }

  findAll() {
    return this.userService.findAllByRoleName(this.roleName);
  }

  findOne(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName);
  }

  update(id: number) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
