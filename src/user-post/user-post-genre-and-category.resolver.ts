import { Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AuthBody } from 'src/auth/types';
import { PgService } from 'src/pg/pg.service';
import { User } from 'src/users/dto/users.dto';
import { CategoryInput, GenreInput } from './input/story.input';

import { UserPostGenreAndCategoryService } from './user-post-genre-and-category.service';

@Resolver()
export class UserPostGenreAndCategoryResolver {
  constructor(
    private userPostGenreAndCategoryService: UserPostGenreAndCategoryService,
  ) {}

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async add_category_to_userpost(
    @Args('input') input: CategoryInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res =
      await this.userPostGenreAndCategoryService.add_category_to_userpost(
        { userPostId: input.userPostId, categoryId: input.categoryId },
        {
          username: currentUser.username,
          password: currentUser.password,
        },
      );

    return res;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async add_genre_to_userpost(
    @Args('input') input: GenreInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res =
      await this.userPostGenreAndCategoryService.add_genre_to_userpost(
        { userPostId: input.userPostId, genreId: input.genreId },
        {
          username: currentUser.username,
          password: currentUser.password,
        },
      );

    return res;
  }
}
