import { Query, Resolver } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { HistoryGlType } from './models/history.model';

@Resolver(() => HistoryGlType)
export class HistoryResolver {
  constructor(private historyService: HistoryService) {}

  @Query(() => [HistoryGlType])
  async histories() {
    const histories = await this.historyService.stories();
    return histories;
  }
}
