import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';

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
      questId: string;
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

  async getQuestNodeContent(
    body: {
      questNodeId: number;
      content: string;
    },
    authBody: AuthBody,
  ): Promise<number> {
    const res = await this.pgService.query<{
      get_quest_node_content: number;
    }>({
      username: authBody.username,
      password: authBody.password,
      query: 'select * from get_quest_node_content($1);',
      values: [body.content],
    });

    return res.rows[0].get_quest_node_content;
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
}
