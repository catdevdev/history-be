import {
  Controller,
  Post,
  Req,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthReq, RegisterReq } from './inputs/auth.input';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: AuthReq): Promise<{ access_token: string }> {
    const token = await this.authService.login(body);

    return token;
  }

  @Post('register')
  async register(@Body() body: RegisterReq): Promise<{ access_token: string }> {
    await this.usersService.createUser(body);
    const foundUser = await this.usersService.findOneByUsernameOrEmail(
      body.username,
    );
    const token = await this.authService.login({
      usernameOrEmail: foundUser.email,
      password: foundUser.password,
    });
    return token;
  }
}
