import { Injectable } from '@nestjs/common';
import { PgService } from 'src/pg/pg.service';
import { UserInput } from 'src/users/inputs/user.input';

@Injectable()
export class StatisticsService {
  constructor(private pgService: PgService) {}

  async write_statistic_about_logging_user(
    body: {
      ipAddress: string;
      systemName: string;
    },
    userInput: UserInput,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from write_statistic_about_logging_user($1, $2)`,
      values: [body.ipAddress, body.systemName],
    });

    return res.rows[0];
  }

  async get_statistic_about_logging_user(
    body: {
      username: string;
    },
    userInput: UserInput,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: userInput.username,
      password: userInput.password,
      query: `select * from get_statistic_about_logging_user_by_user_name($1);`,
      values: [body.username],
    });

    return res.rows[0];
  }
}
