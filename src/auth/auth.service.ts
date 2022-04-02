import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/model/user.model';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrEmail(
      usernameOrEmail,
    );

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      username: user.username,
      password: user.password,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: '123',
    });
    const user = this.usersService.findOneByUsernameOrEmail(decoded.username);

    if (!user) throw new Error('login error');

    return user;
  }
}