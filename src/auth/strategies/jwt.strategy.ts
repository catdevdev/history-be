import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123',
    });
  }
  async validate(validationPayload: {
    username: string;
    sub: string;
  }): Promise<User | null> {
    const user = await this.usersService.findOneByUsernameOrEmail(
      validationPayload.username,
    );
    return user;
  }
}
