import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
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
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: authBody.username,
      password: authBody.password,
      query: `select * from write_statistic_about_logging_user($1, $2)`,
      values: [body.ipAddress, body.systemName],
    });

    return res.rows[0];
  }

  async get_statistic_about_logging_user(
    body: {
      username: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<number>({
      username: authBody.username,
      password: authBody.password,
      query: `select * from get_statistic_about_logging_user_by_user_name($1);`,
      values: [body.username],
    });

    return res.rows[0];
  }

  writeUserPostViewStatistic = async (
    body: {
      userPostId: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<
      {
        isLike: boolean;
        User_id: number;
        UserPost_id: number;
      }[]
    >({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from write_user_post_view_statistic($1);',
      values: [body.userPostId],
    });

    return res.rows;
  };

  getNumberOfViewsByUserpost = async (
    body: {
      userPostId: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      get_number_of_views_by_userpost: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_number_of_views_by_userpost(3);',
      values: [body.userPostId],
    });

    return res.rows;
  };
}
