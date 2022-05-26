import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { CreateUserWithRoleDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(
    @Body() { role, ...body }: CreateUserWithRoleDto,
    @UploadedFile() image,
  ) {
    if (!image) {
      throw new BadRequestException('The image is must required');
    }
    return this.userService.addUser(body, role, image.path);
  }
}
