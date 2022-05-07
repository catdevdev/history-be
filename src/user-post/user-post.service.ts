import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPost } from './dto/user-post.dto';

@Injectable()
export class UserPostService {
  constructor(private pgService: PgService) {}

  getAllUserPosts = async () => {
    const res = await this.pgService.query<UserPost>({
      query: 'select * from get_all_userpost();',
    });

    return res.rows;
  };

  addImageIntoUserPost = async (
    body: {
      userPostId: number;
      imageCoverFileName: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{ update_image_cover: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from update_image_cover($1, $2);',
      values: [body.userPostId, body.imageCoverFileName],
    });

    return res.rows[0].update_image_cover;
  };

  addCategoryToUserPost = async (
    body: {
      userPostId: number;
      categoryId: number;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      add_category_to_userpost: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from add_category_to_userpost($1, $2)',
      values: [body.userPostId, body.categoryId],
    });

    return res.rows[0];
  };

  addGenreToUserPost = async (
    body: {
      userPostId: number;
      genreId: number;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      add_genre_to_userpost: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from add_genre_to_userpost($1, $2);',
      values: [body.userPostId, body.genreId],
    });

    return res.rows[0];
  };
}
