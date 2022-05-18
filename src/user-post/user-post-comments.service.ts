import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPostComment } from './dto/user-post-comment';
import { UserPost } from './dto/user-post.dto';

@Injectable()
export class UserPostCommentsService {
  constructor(private pgService: PgService) {}

  async allCommentsByUserpostId(
    body: {
      userPostId: number;
    },
    authBody: AuthBody,
  ): Promise<UserPostComment[]> {
    const res = await this.pgService.query<UserPostComment>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from all_comments_by_userpost($1);',
      values: [body.userPostId],
    });

    return res.rows;
  }

  async addComment(
    body: {
      userPostId: number;
      content: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ add_comment: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from add_comment($1, $2);',
      values: [body.userPostId, body.content],
    });

    return res.rows[0].add_comment;
  }

  async heartComment(
    body: {
      commentId: number;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ heart_comment: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from heart_comment($1);',
      values: [body.commentId],
    });

    return res.rows[0].heart_comment;
  }

  async banComment(
    body: {
      commentId: number;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ ban_comment: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from ban_comment($1);',
      values: [body.commentId],
    });

    return res.rows[0].ban_comment;
  }

  async unBanComment(
    body: {
      commentId: number;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ unban_comment: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from unban_comment($1);',
      values: [body.commentId],
    });

    return res.rows[0].unban_comment;
  }
}
