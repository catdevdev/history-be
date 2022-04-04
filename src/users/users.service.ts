import { Injectable } from '@nestjs/common';
import { PgService, QueryResult } from 'src/pg/pg.service';

import { UserInput } from './inputs/user.input';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}

  async verifyCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      const res = await this.pgService.query<boolean>(
        username,
        password,
        `select now()`,
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  async createUser(userInput: UserInput): Promise<User> {
    const res = await this.pgService.query<User>(
      'postgres',
      'postgres',
      `select * from create_user($1, $2, $3);`,
      [userInput.email, userInput.username, userInput.password],
    );

    return res.rows[0];
  }

  async findOneByUsername(username: string): Promise<User> {
    const loginResponce = await this.pgService.query<User>(
      'postgres',
      'postgres',
      `select * from get_user_by_username($1);`,
      [username],
    );

    return loginResponce.rows[0];
  }
}
