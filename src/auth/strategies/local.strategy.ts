import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/dto/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(usernameOrEmail: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(usernameOrEmail, password);

    const userWithPassword = { ...user };
    userWithPassword.password = password;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
