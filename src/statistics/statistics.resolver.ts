import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';

import { User } from 'src/users/dto/users.dto';
import { Statistic } from './dto/statistics.dto';
import {
  GetStatisticAboutLoggingUserInput,
  WriteStatisticAboutLoggingUserInput,
} from './input/statistics.input';
import { StatisticGlType } from './models/statistics.model';
import { StatisticsService } from './statistics.service';

@Resolver()
export class StatisticsResolver {
  constructor(private statisticsService: StatisticsService) {}

  @Query(() => Int)
  async write_statistic_about_logging_user(
    @Args('input') input: WriteStatisticAboutLoggingUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const statistics =
      await this.statisticsService.write_statistic_about_logging_user(
        { ipAddress: input.ipAddress, systemName: input.systemName },
        {
          username: currentUser.username,
          password: currentUser.password,
        },
      );

    return statistics;
  }

  @Query(() => [StatisticGlType])
  async get_statistic_about_logging_user(
    @Args('input') input: GetStatisticAboutLoggingUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<StatisticGlType[]> {
    const statistics = this.statisticsService.get_statistic_about_logging_user(
      { username: input.username },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return statistics;
  }
}
