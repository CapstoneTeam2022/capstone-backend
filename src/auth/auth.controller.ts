import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { JwtGuard, RolesGuard } from './guard';
import { Roles } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('guarded')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Employee', 'x')
  guarded(@Request() req) {
    return { msg: req.user };
  }
}
