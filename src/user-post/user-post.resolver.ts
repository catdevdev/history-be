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
}
