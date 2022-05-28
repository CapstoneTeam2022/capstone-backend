import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserWithRoleDto } from '../user/dto';

@Injectable()
export class EmployeeService {
  readonly roleName = 'Employee';

  constructor(private userService: UserService) {}

  create({ role, ...data }: CreateUserWithRoleDto, image: string) {
    return this.userService.addUser(data, role, image);
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
    return this.userService.findOneByRoleName(id, this.roleName);
  }

  update(id: number) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
