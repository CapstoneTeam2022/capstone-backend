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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileUploadInterceptor } from 'src/interceptors/fileupload.interceptor';
import { CreateUserWithRoleDto, UpdatePasswordDto, UpdateUserDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';

// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mailService: MailerService,
  ) {}

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

  @Post('/profile')
  getProfile(@Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    if (!user.id) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.userService.getUser(user.id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Post()
  create(
    @Body() { role, ...body }: CreateUserWithRoleDto, // @UploadedFile() image,
  ) {
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

  // Password forgot

  @Get('/password-forget/plainTextemail')
  async plainText(@Query('toemail') toemail) {
    const result = await this.mailService.sendMail({
      to: toemail,
      from: 'robelshewan21@gmail.com',
      subject: 'Reset your EMR password',
      text: 'Password forget  ',
      html: '<p>Someone (hopefully you) has requested a password reset for your EMR account. Follow the link below to set a new password: </p> <a href ="http://localhost:3000/forgot-password">http://localhost:3000/forget-passowrd</a> <h2>The EMR Team</h2> ',
    });
    console.log(result);
    return 'success';
  }
}
