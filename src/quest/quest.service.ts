import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { Quest } from './dto/quest.dto';

@Injectable()
export class QuestService {
  constructor(private pgService: PgService) {}

  async createQuest(
    body: {
      questName: string;
      questDescription?: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ create_quest: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from create_quest($1, $2);',
      values: [body.questName, body.questDescription],
    });

    return res.rows[0].create_quest;
  }

  async createQuestNode(
    body: {
      questId: number;
      content?: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{ create_quest_node: number }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from create_quest_node($1, $2);',
      values: [body.questId, body.content],
    });

    return res.rows[0].create_quest_node;
  }

  async createQuestNodeChoice(
    body: {
      questId: number;
      questNodeFrom: number;
      choiceContent: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{
      create_quest_node_choice: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from create_quest_node_choice($1, $2, $3);',
      values: [body.questId, body.questNodeFrom, body.choiceContent],
    });

    return res.rows[0].create_quest_node_choice;
  }

  async getFirstQuestNode(
    body: {
      questId: number;
    },
    authBody: AuthBody,
  ): Promise<{
    Quest_id: number;
    QuestNode_id: number;
    isEnd: boolean;
    content: string;
  }> {
    const res = await this.pgService.query<{
      Quest_id: number;
      QuestNode_id: number;
      isEnd: boolean;
      content: string;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_first_quest_node($1);',
      values: [body.questId],
    });

    return res.rows[0];
  }

  async getQuestNodeChoices(
    body: {
      questNodeId: number;
    },
    authBody: AuthBody,
  ): Promise<
    {
      QuestNode_id: number;
      content: string;
      toQuestNode: number;
    }[]
  > {
    const res = await this.pgService.query<{
      QuestNode_id: number;
      content: string;
      toQuestNode: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_quest_node_choices($1);',
      values: [body.questNodeId],
    });

    return res.rows;
  }

  async getQuestNodeContent(
    body: {
      questNodeId: number;
    },
    authBody: AuthBody,
  ): Promise<
    {
      Quest_id: number;
      QuestNode_id: number;
      isEnd: boolean;
      content: string;
    }[]
  > {
    const res = await this.pgService.query<{
      Quest_id: number;
      QuestNode_id: number;
      isEnd: boolean;
      content: string;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_quest_node_content($1);',
      values: [body.questNodeId],
    });

    return res.rows;
  }

  async updateQuestNodeContent(
    body: {
      questNodeId: number;
      content: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{
      update_quest_node_content: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from update_quest_node_content($1, $2)',
      values: [body.questNodeId, body.content],
    });

    return res.rows[0].update_quest_node_content;
  }
}
