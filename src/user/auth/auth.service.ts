import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(username);
    
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }
    
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token:this.jwtService.sign(payload),
    }
  }
   

    
}
