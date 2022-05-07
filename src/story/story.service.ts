import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { History } from './dto/story.dto';

@Injectable()
export class StoryService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private pgService: PgService) {}

  async createStory(
    body: {
      storyName: string;
      storyDescription?: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ create_story: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from create_story($1, $2);',
      values: [body.storyName, body.storyDescription],
    });

    console.log(res.rows[0].create_story);
    return res.rows[0].create_story;
  }

  async updateStoryContent(
    body: {
      story_id: number;
      content: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ update_story_content: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from update_story_content($1, $2);',
      values: [body.story_id, body.content],
    });

    //   username: authBody.username,
    //   password: authBody.password,
    //   query: 'select * from update_image_cover($1, $2);',
    //   values: [body.userId, body.imageAvatarUrl],
    return res.rows[0].update_story_content;
  }
}
