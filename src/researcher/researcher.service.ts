import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

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
}
