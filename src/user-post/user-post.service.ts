import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPost } from './dto/user-post.dto';

@Injectable()
export class UserPostService {
  constructor(private pgService: PgService) {}

  getAllUserPosts = async () => {
    const res = await this.pgService.query<UserPost>({
      query: 'select * from get_all_userposts();',
    });

    return res.rows;
  };

  getAllMyUserPosts = async (authBody: AuthBody) => {
    const res = await this.pgService.query<UserPost>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_all_my_userposts();',
    });

    return res.rows;
  };

  moveIntoTrashUserPost = async (
    body: {
      userPostId: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      move_into_trash_user_post: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from move_into_trash_user_post($1);',
      values: [body.userPostId],
    });

    return res.rows[0].move_into_trash_user_post;
  };

  likeOrDislikeUserPost = async (
    body: {
      userPostId: string;
      like: boolean;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      like_or_dislike_user_post: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from like_or_dislike_user_post($1, $2);',
      values: [body.userPostId, body.like],
    });

    return res.rows[0].like_or_dislike_user_post;
  };

  getLikeOrDislikeUserPost = async (
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
      query: 'select * from get_like_or_dislike_user_post($1);',
      values: [body.userPostId],
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
}
