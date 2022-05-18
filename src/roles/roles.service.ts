import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';

@Injectable()
export class RolesService {
  constructor(private pgService: PgService) {}

  async getRolesOfUser(
    username: string,
    userInput: AuthBody,
  ): Promise<string[]> {
    const res = await this.pgService.query<string>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from get_roles_of_user($1);`,
      values: [username],
    });

    return res.rows;
  }

  async give_user_role(
    body: {
      username: string;
      roleName: string;
    },
    userInput: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ give_user_role: number }>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from give_user_role($1, $2);`,
      values: [body.username, body.roleName],
    });

    return res.rows[0].give_user_role;
  }

  async remove_user_role(
    body: {
      username: string;
      roleName: string;
    },
    userInput: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ remove_user_role: number }>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from remove_user_role($1, $2);`,
      values: [body.username, body.roleName],
    });

    return res.rows[0].remove_user_role;
  }
}
