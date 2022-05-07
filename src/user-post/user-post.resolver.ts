import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/dto/users.dto';
import {
  AddCategoryToUserPostInput,
  AddGenreToUserPostInput,
} from './input/story.input';
import { UserPostGlType } from './models/user-post.model';
import { UserPostService } from './user-post.service';

@Resolver()
export class UserPostResolver {
  constructor(private userPostService: UserPostService) {}

  @Query(() => [UserPostGlType])
  async userPosts(): Promise<UserPostGlType[]> {
    const userPosts = await this.userPostService.getAllUserPosts();

    return userPosts;
  }

  @Mutation(() => Number)
  async addCategoryToUserPost(
    @Args('input') input: AddCategoryToUserPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    console.log(currentUser);
    const result = await this.userPostService.addCategoryToUserPost(
      {
        userPostId: input.userPostId,
        categoryId: input.categoryId,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result.add_category_to_userpost;
  }

  @Mutation(() => Number)
  async addGenreToUserPost(
    @Args('input') input: AddGenreToUserPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const result = await this.userPostService.addGenreToUserPost(
      {
        userPostId: input.userPostId,
        genreId: input.genreId,
      },
      { username: currentUser.username, password: currentUser.password },
    );

    return result.add_genre_to_userpost;
  }
}
