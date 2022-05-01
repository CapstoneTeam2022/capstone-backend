import { CreateUserDto } from './dtos';
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.userService.addUser(body);
  }
}
