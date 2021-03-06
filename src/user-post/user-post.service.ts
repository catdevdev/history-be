import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPost } from './dto/user-post.dto';

@Injectable()
export class UserPostService {
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
  getAllMyUserPosts = async (authBody: AuthBody) => {
    const res = await this.pgService.query<UserPost>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_all_my_userposts();',
    });

    return res.rows.filter(
      (row) => row.isBanned !== true || row.inTrash !== true,
    );
  };
  getAllUserPosts = async (authBody: AuthBody) => {
    const res = await this.pgService.query<UserPost>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_all_userposts();',
    });

    return res.rows.filter(
      (row) => row.isBanned !== true || row.inTrash !== true,
    );
  };
  getLikeOrDislikeUserPost = async (
    body: {
      userPostId: number;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      isLike: boolean;
      User_id: number;
      UserPost_id: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_like_or_dislike_user_post($1);',
      values: [body.userPostId],
    });

    return res.rows;
  };
  getUserPostById = async (
    body: {
      userPostId: number;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<UserPost>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_userpost_by_id($1)',
      values: [body.userPostId],
    });

    return res.rows[0];
  };
  likeOrDislikeUserPost = async (
    body: {
      userPostId: number;
      like: boolean;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{
      like_or_dislike_user_post: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: `select * from like_or_dislike_user_post(${body.userPostId}, ${body.like});`,
    });

    return res.rows[0].like_or_dislike_user_post;
  };
  moveIntoTrashUserPost = async (
    body: {
      userPostId: number;
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

  constructor(private pgService: PgService) {}
}
