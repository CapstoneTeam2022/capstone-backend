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
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';
import { CreateUserWithRoleDto, UpdateUserDto } from './dto';
import { JwtGuard } from '../auth/guard';

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
}
