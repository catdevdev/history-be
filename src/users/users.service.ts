import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
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
      await this.pgService.query<any>({
        username,
        password,
        query: `select now()`,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async createUser(userInput: UserInput): Promise<User> {
    const res = await this.pgService.query<User>({
      username: 'postgres',
      password: 'postgres',
      query: `select * from create_user($1, $2, $3);`,
      values: [userInput.email, userInput.username, userInput.password],
    });

    const userWithPassword = res.rows[0];
    userWithPassword.password = userInput.password;

    return userWithPassword;
  }

  async findOneByUsername(username: string): Promise<User> {
    const loginResponce = await this.pgService.query<User>({
      username: 'postgres',
      password: 'postgres',
      query: `select * from get_user_by_username($1);`,
      values: [username],
    });
    return loginResponce.rows[0];
  }

  async currentUser(username: string, password: string): Promise<User> {
    const loginResponce = await this.pgService.query<User>({
      username,
      password,
      query: `select * from loggen_in_user();`,
    });
    const rolesOfCurrentUser = await this.pgService.query<User>({
      // "username",
      password,
      query: `select * from get_roles_of_user();`,
    });

    const user = { ...loginResponce.rows[0] };
    user.password = password;
    return user;
  }

  addOrUpdateUserAvatarImage = async (
    body: {
      userId: number;
      imageAvatarUrl: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{ update_image_cover: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from update_image_cover($1, $2);',
      values: [body.userId, body.imageAvatarUrl],
    });

    return res.rows[0].update_image_cover;
  };
}
