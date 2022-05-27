import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StatisticsService } from 'src/statistics/statistics.service';
import { User } from 'src/users/dto/users.dto';
import { UserGqType } from 'src/users/model/user.model';

import { UsersService } from '../users/users.service';
import { AuthReq, RegisterReq } from './inputs/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private statisticService: StatisticsService,
    private jwtService: JwtService, // write_statistic_about_logging_user
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const isVerified = await this.usersService.verifyCredentials(
      username,
      password,
    );

    if (!isVerified) {
      return;
    }

    const user = await this.usersService.findOneByUsername(
      { username },
      { username: 'postgres', password: 'postgres' },
    );

    if (user) {
      const resultUser = { ...user };
      resultUser.password = password;

      return resultUser;
    }
    return null;
  }

  async login(authReq: AuthReq): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(
      { username: authReq.username },
      { username: 'postgres', password: 'postgres' },
    );

    this.statisticService.write_statistic_about_logging_user(
      {
        ipAddress: '192.168.1.1',
        systemName: 'IOS',
      },
      { username: authReq.username, password: authReq.password },
    );
    const payload = {
      User_id: user.User_id,
      username: authReq.username,
      password: authReq.password,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async register(body: RegisterReq): Promise<{ access_token: string }> {
    await this.usersService.createUser(body);
    const foundUser = await this.usersService.findOneByUsername(
      { username: body.username },
      { username: 'postgres', password: 'postgres' },
    );
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

    const user = await this.usersService.findOneByUsername(
      { username: decoded.username },
      { username: 'postgres', password: 'postgres' },
    );
    const userWithPassword = user;
    userWithPassword.password = decoded.password;

    if (!user) throw new Error('login error');

    return userWithPassword;
  }
}
