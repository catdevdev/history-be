import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { HistoryGlType } from './models/story.model';
import { History } from './dto/story.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import {
  CreateStoryInput,
  GetStoryInput,
  UpdateStoryContent,
} from './input/story.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/dto/users.dto';

@Resolver(() => HistoryGlType)
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async createStory(
    @Args('input') input: CreateStoryInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const story_id = await this.storyService.createStory(
      { storyName: input.storyName, storyDescription: input.storyDescription },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return story_id;
  }

// @Query(() => [HistoryGlType])
  // async stories(): Promise<History[]> {
  //   const stories = await this.storyService.stories();
  //   return stories;
  // }

  @Query(() => HistoryGlType)
  @UseGuards(GqlAuthGuard)
  async getStoryById(
    @Args('input') input: GetStoryInput,
    @CurrentUser() currentUser: User,
  ): Promise<HistoryGlType> {
    const story = await this.storyService.getStoryById(
      { storyId: input.storyId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );
    console.log(story);
    return story;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async updateStoryContent(
    @Args('input') input: UpdateStoryContent,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const story_id = await this.storyService.updateStoryContent(
      { story_id: input.storyId, content: input.storyContent },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return story_id;
  }
}
