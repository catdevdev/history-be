import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';

@Injectable()
export class UserPostService {
  constructor(private pgService: PgService) {}

  addImageIntoUserPost = async (
    body: {
      userPostId: number;
      imageCoverFileName: string;
    },
    authBody: AuthBody,
  ) => {
    const res = await this.pgService.query<{ update_image_cover: number }>(
      authBody.username,
      authBody.password,
      'select * from update_image_cover($1, $2);',
      [body.userPostId, body.imageCoverFileName],
    );

    return res.rows[0].update_image_cover;
  };
}
