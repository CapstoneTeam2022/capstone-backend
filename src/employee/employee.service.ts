import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserWithRoleDto, UserDto } from '../user/dto';

@Injectable()
export class EmployeeService {
  readonly roleName = 'Employee';

  constructor(private userService: UserService) {}

  create({ role, ...data }: CreateUserWithRoleDto) {
    return this.userService.addUser({ ...data, isResearcher: false }, role);
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
