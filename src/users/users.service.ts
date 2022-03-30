import { Injectable } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';

import { UserInput } from './inputs/user.input';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}

  async createUser(userInput: UserInput): Promise<User> {
    const res = await this.pgService.query<User>(
      'postgres',
      'postgres',
      `select now()`,
    );
    return res.rows[0];
  }

  async findOneByUsernameOrEmail(usernameOrPassword: string): Promise<User> {
    const res = await this.pgService.query<User>(
      'postgres',
      'postgres',
      `select now(${usernameOrPassword})`,
    );

    return res.rows[0];
  }
}
