import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { History } from './dto/story.dto';

@Injectable()
export class StoryService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private pgService: PgService) {}

  async story(id: number): Promise<History> {
    const res = await this.pgService.query<History>(
      'postgres',
      'postgres',
      'select now()',
    );

    res.rows[0];

    return {
      id: 3,
      title: '123',
      content: '123',
    };
  }

  async stories(): Promise<History[]> {
    const res = await this.pgService.query(
      'postgres',
      'postgres',
      'select now()',
    );

    return [
      {
        id: 0,
        title: '123',
        content: 'sfd',
      },
      {
        id: 1,
        title: '1234',
        content: 'sfdf',
      },
    ];
  }

  async createStory(
    body: {
      storyName: string;
      storyDescription?: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ create_story: number }>(
      authBody.username,
      authBody.password,
      'select * from create_story($1, $2);',
      [body.storyName, body.storyDescription],
    );
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
    const res = await this.pgService.query<{ update_story_content: number }>(
      authBody.username,
      authBody.password,
      'select * from update_story_content($1, $2);',
      [body.story_id, body.content],
    );
    return res.rows[0].update_story_content;
  }
}
