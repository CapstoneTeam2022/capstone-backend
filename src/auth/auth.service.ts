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

@Injectable()
export class AuthService {
  constructor(
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
      user.isPasswordReset,
    );
    return {
      access_token,
      email,
      role: user.role.name,
      isPasswordReset: user.isPasswordReset
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

  async signToken(
    id: number,
    email: string,
    role: string,
    isPasswordReset: boolean,
  ) {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: id,
      email,
      role,
      isPasswordReset,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10d',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
