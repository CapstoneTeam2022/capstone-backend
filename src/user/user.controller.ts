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
import {
  CheckEmail,
  CreateUserWithRoleDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { AddressDto } from '../address/dto';
import { MailService } from '../mail/mail.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mailerService: MailerService,
    private mailService: MailService, //rediet
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
      throw new InternalServerErrorException('Internal server error: no user');
    }
    if (!user.id) {
      throw new InternalServerErrorException('Internal server error: no id');
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

  @Put('/address/update')
  updateAddressForUser(@Body() body: AddressDto, @Req() request: Request) {
    const user = request.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.userService.updateAddressForUser(user.id, body);
  }

  @Post('/password/forgot')
  async forgotPassword() {
    return await this.mailService.sendUserConfirmation();
  }

  @Post('/password/update')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() request: Request) {
    const user = request.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }

    return this.userService.updatePassword(user.id, body);
  }

  @Post('checkemail')
  checkEmail(@Body() body: CheckEmail) {
    return this.userService.getUserByEmail(body.email);
  }

  @Get('/password-forget/plainTextemail')
  async plainText(@Query('toemail') toemail) {
    const result = await this.mailerService.sendMail({
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
