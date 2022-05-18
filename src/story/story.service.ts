import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { UserPost } from 'src/user-post/dto/user-post.dto';
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

    return res.rows[0].create_story;
  }

  async getStoryById(
    body: {
      storyId: number;
    },
    authBody: AuthBody,
  ): Promise<History> {
    const res = await this.pgService.query<History>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_story_by_id($1);',
      values: [body.storyId],
    });

    return res.rows[0];
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

    return res.rows[0].update_story_content;
  }
}
