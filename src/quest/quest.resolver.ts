import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/dto/users.dto';
import {
  CreateQuestInput,
  CreateQuestNodeChoiceInput,
  CreateQuestNodeInput,
  GetQuestNodeContentInput,
  UpdateQuestNodeContentInput,
} from './input/quest.input';
import { QuestChoiceGlType, QuestGlType } from './models/quest.model';
import { QuestService } from './quest.service';

@Resolver()
export class QuestResolver {
  constructor(private questService: QuestService) {}

  @Mutation(() => Number)
  async createQuest(
    @Args('input') input: CreateQuestInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const result = await this.questService.createQuest(
      {
        questName: input.questName,
        questDescription: input.questDescription,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result;
  }

  @Mutation(() => Number)
  async createQuestNode(
    @Args('input') input: CreateQuestNodeInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const result = await this.questService.createQuestNode(
      {
        questId: input.questId,
        content: input.content,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result;
  }

  @Mutation(() => Number)
  async createQuestNodeChoice(
    @Args('input') input: CreateQuestNodeChoiceInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const result = await this.questService.createQuestNodeChoice(
      {
        questId: input.questId,
        questNodeFrom: input.questNodeFrom,
        choiceContent: input.choiceContent,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result;
  }

  @Mutation(() => Number)
  async updateQuestNodeContent(
    @Args('input') input: UpdateQuestNodeContentInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const result = await this.questService.updateQuestNodeContent(
      {
        questNodeId: input.questNodeId,
        content: input.content,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result;
  }

  @Query(() => [QuestGlType])
  async getQuestNodeContent(
    @Args('input') input: GetQuestNodeContentInput,
    @CurrentUser() currentUser: User,
  ): Promise<QuestGlType[]> {
    const userPosts = await this.questService.getQuestNodeContent(
      {
        questNodeId: input.questNodeId,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return userPosts;
  }

  @Query(() => [QuestChoiceGlType])
  async getQuestNodeChoices(
    @Args('input') input: GetQuestNodeContentInput,
    @CurrentUser() currentUser: User,
  ): Promise<QuestChoiceGlType[]> {
    const userPosts = await this.questService.getQuestNodeChoices(
      {
        questNodeId: input.questNodeId,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return userPosts;
  }
}
