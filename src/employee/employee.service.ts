import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserWithRoleDto, UpdateUserDto, UserDto } from '../user/dto';
import { User } from '../user/user.entity';

@Injectable()
export class EmployeeService {
  readonly roleName = 'Employee';

  constructor(private userService: UserService) {}

  async create({ role, ...data }: CreateUserWithRoleDto, userId: number) {
    const healthCenter = await this.userService.getHealthCenterForUser(userId);
    data.healthCenterId = healthCenter.id;
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
