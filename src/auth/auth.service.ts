import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/dto/users.dto';
import { UserGqType } from 'src/users/model/user.model';

import { UsersService } from '../users/users.service';
import { AuthReq, RegisterReq } from './inputs/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const isVerified = await this.usersService.verifyCredentials(
      username,
      password,
    );

    if (!isVerified) {
      return;
    }

    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const resultUser = { ...user };
      resultUser.password = password;

      return resultUser;
    }
    return null;
  }

  async login(authReq: AuthReq): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(authReq.username);
    const payload = {
      User_id: user.User_id,
      username: authReq.username,
      password: authReq.password,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(body: RegisterReq): Promise<{ access_token: string }> {
    await this.usersService.createUser(body);
    const foundUser = await this.usersService.findOneByUsername(body.username);
    const access_token = await this.login({
      User_id: foundUser.User_id,
      username: body.username,
      password: body.password,
    });
    return access_token;
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: '123123',
    });

    const user = await this.usersService.findOneByUsername(decoded.username);
    const userWithPassword = user;
    userWithPassword.password = decoded.password;

    if (!user) throw new Error('login error');

    return userWithPassword;
  }
}
