import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserGqType } from 'src/users/model/user.model';
import { User } from 'src/users/dto/users.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123123',
    });
  }

  async validate(validationPayload: {
    User_id: number;
    username: string;
    password: string;
    sub: string;
  }): Promise<any | null> {
    const user = await this.usersService.findOneByUsername(
      validationPayload.username,
    );

    return {
      User_id: validationPayload.User_id,
      username: user.username,
      password: validationPayload.password,
    };
  }
}
