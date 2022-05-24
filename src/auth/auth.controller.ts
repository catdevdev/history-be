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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: AuthReq): Promise<{ access_token: string }> {
    const token = await this.authService.login(body);

    return token;
  }

  @Post('register')
  async register(@Body() body: RegisterReq): Promise<{ access_token: string }> {
    const token = await this.authService.register(body);

    console.log(token);

    return token;
  }
}
