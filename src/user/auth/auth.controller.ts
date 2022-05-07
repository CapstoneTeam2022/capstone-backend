import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post, 
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/user/auth/auth.service';
import { LocalAuthGuard } from 'src/user/auth/local-auth.guard';
import { LoginDto } from '../loginDto';
import { LocalStrategy } from 'src/user/auth/local.strategy';
import { AuthenticatedGuard } from 'src/user/auth/authenticated.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private localStrategy: LocalStrategy
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
      return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.getUser(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: UserDto, roleName:string) {
    return this.userService.addUser(body,roleName);
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }


 
}
