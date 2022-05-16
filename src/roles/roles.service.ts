import { Injectable } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';
import { UserInput } from 'src/users/inputs/user.input';

@Injectable()
export class RolesService {
  constructor(private pgService: PgService) {}

  async getRolesOfUser(
    username: string,
    userInput: UserInput,
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
    userInput: UserInput,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from give_user_role($1, $2);`,
      values: [body.username, body.roleName],
    });

    return res.rows[0];
  }

  async remove_user_role(
    body: {
      username: string;
      roleName: string;
    },
    userInput: UserInput,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from remove_user_role($1, $2);`,
      values: [body.username, body.roleName],
    });

    return res.rows[0];
  }
}
