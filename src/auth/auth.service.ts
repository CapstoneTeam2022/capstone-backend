import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    { email, password },
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.getUserByEmail(email);
    if (!(await argon2.verify(user.password, password))) {
      throw new BadRequestException('Invalid Credentials ');
    }
    const token = await this.jwtService.signAsync({ id: user.id });
    response.cookie('token', token, { httpOnly: true });

    return {
      message: 'Success',
      user,
    };
  }
  async getLoginUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['token'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) throw new UnauthorizedException();

      const user = await this.userService.getUser(data.id);
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    return {
      message: 'success',
    };
  }
}
