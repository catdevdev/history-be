import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model/user.model';

import { UsersService } from '../users/users.service';
import { AuthReq } from './inputs/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const isVerified = await this.usersService.verifyCredentials(
      username,
      pass,
    );
    if (!isVerified) {
      return;
    }
    const user = await this.usersService.findOneByUsername('username');

    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return;
  }

  async login(authReq: AuthReq): Promise<{ access_token: string }> {
    const payload = {
      usernameOrEmail: authReq.usernameOrEmail,
      password: authReq.password,
    };

    const success = await this.usersService;

    return { access_token: this.jwtService.sign(payload) };
  }

  verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: '123',
    });

    console.log(decoded);

    const user = this.usersService.findOneByUsernameOrEmail(decoded.username);

    if (!user) throw new Error('login error');

    return user;
  }
}
