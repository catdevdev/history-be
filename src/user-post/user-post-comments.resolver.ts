import { Query, Resolver } from '@nestjs/graphql';
import { UserPostGlType } from './models/user-post.model';
import { UserPostService } from './user-post.service';

@Resolver()
export class UserPostCommentsResolver {
  constructor(private userPostService: UserPostService) {}

  @Query(() => [UserPostGlType])
  async userPosts(): Promise<UserPostGlType[]> {
    const userPosts = await this.userPostService.getAllUserPosts();

    return userPosts;
  }
}
