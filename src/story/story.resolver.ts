import { Query, Resolver } from '@nestjs/graphql';
import { StoryService } from './story.service';
import { HistoryGlType } from './models/story.model';
import { History } from './dto/story.dto';

@Resolver(() => HistoryGlType)
export class StoryResolver {
  constructor(private storyService: StoryService) {}

  @Query(() => [HistoryGlType])
  async stories(): Promise<History[]> {
    const stories = await this.storyService.stories();
    return stories;
  }
}
