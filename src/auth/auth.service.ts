<<<<<<< HEAD
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
=======
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { SignInDto, SignInReturnDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
>>>>>>> 7d1b3f7903c5c6fffd191e9374728bcebd642c82

@Injectable()
export class AuthService {
  constructor(
<<<<<<< HEAD
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
=======
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}
  async signIn({ email, password }: SignInDto): Promise<SignInReturnDto> {
    const user = await this.findWithEmail(email);
    const passwordsMatch = await argon.verify(user.password, password);

    if (!passwordsMatch) {
      throw new ForbiddenException('Invalid Credentials: password');
    }

    const { access_token } = await this.signToken(
      user.id,
      user.email,
      user.role.name,
    );
    return {
      access_token,
      email,
      role: user.role.name,
    };
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['role'],
    });
    if (user) return user;
    throw new NotFoundException(`User with id ${id} not found`);
  }

  async findWithEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['role'],
      select: [
        'id',
        'name',
        'phone',
        'age',
        'gender',
        'email',
        'password',
        'isActive',
        'isResearcher',
        'isAdmin',
      ],
    });
    if (user) return user;
    throw new NotFoundException(`User with email ${email} not found`);
  }

  async signToken(id: number, email: string, role: string) {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: id,
      email,
      role,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
    return {
      access_token: token,
>>>>>>> 7d1b3f7903c5c6fffd191e9374728bcebd642c82
    };
  }
}
