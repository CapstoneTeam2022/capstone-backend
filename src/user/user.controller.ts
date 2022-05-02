import { CreateUserDto } from './dtos';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { param } from 'express-validator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.userService.addUser(body);
  }
  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.userService.updateUserInfo(id, body);
  }

  @Put('/disactive/:id')
  disactiveUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.disActiveUser(id);
  }
}
