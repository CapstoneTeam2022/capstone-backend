import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserWithRoleDto, UpdateUserDto, UserDto } from '../user/dto';

@Injectable()
export class EmployeeService {
  readonly roleName = 'Employee';

  constructor(private userService: UserService) {}

  create({ role, ...data }: CreateUserWithRoleDto) {
    return this.userService.addUser(data, role);
  }

  findAll() {
    return this.userService.findAllByRoles(
      'Doctor',
      'Nurse',
      'Receptionist',
      'Hospital Admin',
      'Lab Expert',
      'Radiologist',
    );
  }

  findOne(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName, 'address');
  }

  updateEmployee(id: number, updateEmployeeDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateEmployeeDto);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
