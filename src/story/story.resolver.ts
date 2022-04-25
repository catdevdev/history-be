import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { HistoryGlType } from './models/story.model';
import { History } from './dto/story.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CreateStoryInput } from './input/story.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/dto/users.dto';

@Resolver(() => HistoryGlType)
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  @Query(() => [HistoryGlType])
  async stories(): Promise<History[]> {
    const stories = await this.storyService.stories();
    return stories;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async createStory(
    @Args('input') input: CreateStoryInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    console.log(input);
    const story_id = await this.storyService.createStory(
      { storyName: input.storyName, storyDescription: input.storyDescription },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return story_id;
  }
}
