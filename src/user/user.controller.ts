import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Put,
  UseGuards,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';
import { CreateUserWithRoleDto, UpdatePasswordDto, UpdateUserDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from './user.entity';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/employee/count')
  getEmployeeCount() {
    return this.userService.getEmployeeCount();
  }

  @Get()
  getUserByRole() {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  //@UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(
    @Body() { role, ...body }: CreateUserWithRoleDto, // @UploadedFile() image,
  ) {
    // if (!image) {
    //   throw new BadRequestException('The image is required');
    // }
    return this.userService.addUser(body, role);
  }

  @Post('/profileImage/:id')
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  uploadImage(@Param('id', ParseIntPipe) id: number, @UploadedFile() image) {
    if (!image) {
      throw new BadRequestException('The image is required');
    }
    return this.userService.updateProfileImage(id, image.path);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Post('/password/update')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() request: Request) {
    const user = request.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }

    return this.userService.updatePassword(user.id, body);
  }
}
