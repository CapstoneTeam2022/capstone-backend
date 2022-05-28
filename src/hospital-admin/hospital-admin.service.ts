import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { UserDto } from '../user/dto';

@Injectable()
export class HospitalAdminService {
  readonly roleName = 'Hospital Admin';
  constructor(private userService: UserService) {}

  getAll() {
    return this.userService.findAllByRoleName(this.roleName);
  }

  getById(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName);
  }

  createHospitalAdmin(user: UserDto) {
    return this.userService.addUser(user, this.roleName);
  }
}
