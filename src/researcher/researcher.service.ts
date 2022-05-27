import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateUserDto, UserDto } from '../user/dto';

@Injectable()
export class ResearcherService {
  readonly roleName = 'Researcher';
  constructor(private userService: UserService) {}

  getAll() {
    return this.userService.findAllByRoleName(this.roleName);
  }

  getById(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName);
  }

  create(user: UserDto) {
    user.isResearcher = true;
    return this.userService.addUser(user, this.roleName);
  }

  async getNumOfResearchers() {
    const num =  (await this.userService.findAllByRoleName(this.roleName)).length;
    return num
  }
  async updateResearcher(id: number, data: UpdateUserDto) {
    return this.userService.updateUser(id, data)
  }
}
