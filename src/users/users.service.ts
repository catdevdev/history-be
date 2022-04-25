import { Injectable } from '@nestjs/common';
import { PgService, QueryResult } from 'src/pg/pg.service';
import { User } from './dto/users.dto';

import { UserInput } from './inputs/user.input';
import { UserGqType } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}

  async verifyCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      await this.pgService.query<any>(username, password, `select now()`);
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

    const userWithPassword = res.rows[0];
    userWithPassword.password = userInput.password;

    return userWithPassword;
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

  async currentUser(username: string, password: string): Promise<User> {
    const loginResponce = await this.pgService.query<User>(
      username,
      password,
      `select * from loggen_in_user();`,
    );
    const user = { ...loginResponce.rows[0] };
    user.password = password;
    console.log(loginResponce);
    return user;
  }
}
