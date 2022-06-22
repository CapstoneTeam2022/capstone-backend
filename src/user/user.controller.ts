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
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from './user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { AddressDto } from '../address/dto';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private mailService: MailService, //rediet
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get('/employee/count')
  getEmployeeCount() {
    return this.userService.getEmployeeCount();
  }

  @UseGuards(JwtGuard)
  @Get()
  getUserByRole() {}

  @UseGuards(JwtGuard)
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

  @UseGuards(JwtGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() { role, ...body }: CreateUserWithRoleDto, // @UploadedFile() image,
  ) {
    return this.userService.addUser(body, role);
  }

  @UseGuards(JwtGuard)
  @Post('/profileImage/:id')
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  uploadImage(@Param('id', ParseIntPipe) id: number, @UploadedFile() image) {
    if (!image) {
      throw new BadRequestException('The image is required');
    }
    return this.userService.updateProfileImage(id, image.path);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(JwtGuard)
  @Put('/address/update')
  updateAddressForUser(@Body() body: AddressDto, @Req() request: Request) {
    const user = request.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.userService.updateAddressForUser(user.id, body);
  }

  @UseGuards(JwtGuard)
  @Post('/password/forgot')
  async forgotPassword() {
    return await this.mailService.sendUserConfirmation();
  }

  // @UseGuards(JwtGuard)
  @Post('/password/reset')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

  @UseGuards(JwtGuard)
  @Post('/password/update')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() request: Request) {
    const user = request.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }

    return this.userService.updatePassword(user.id, body);
  }

  @UseGuards(JwtGuard)
  @Post('checkemail')
  checkEmail(@Body() body: CheckEmail) {
    return this.userService.getUserByEmail(body.email);
  }

  @Get('/password-forget/plainTextemail')
  async plainText(@Query('toemail') toemail) {
    return this.userService.sendEmail(toemail);
  }
}
