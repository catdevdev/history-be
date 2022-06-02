import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';

@Injectable()
export class UserPostGenreAndCategoryService {
  constructor(private pgService: PgService) {}

  async add_category_to_userpost(
    body: {
      userPostId: number;
      categoryId: number;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{
      add_category_to_userpost: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from add_category_to_userpost($1, $2);',
      values: [body.userPostId, body.categoryId],
    });

    return res.rows[0].add_category_to_userpost;
  }

  async add_genre_to_userpost(
    body: {
      userPostId: number;
      genreId: number;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ add_genre_to_userpost: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from add_genre_to_userpost($1, $2)',
      values: [body.userPostId, body.genreId],
    });

    return res.rows[0].add_genre_to_userpost;
  }
}
