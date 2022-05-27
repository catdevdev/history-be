import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/dto/users.dto';
import {
  AddCategoryToUserPostInput,
  AddGenreToUserPostInput,
  GetLikeOrDislikeUserPostInput,
  GetUserPostByIdInput,
  LikeOrDislikeUserPostInput,
  MoveIntoTrashUserPostInput,
} from './input/story.input';
import {
  LikeOrDislikeUserPostGlType,
  UserPostGlType,
} from './models/user-post.model';
import { UserPostService } from './user-post.service';

@Resolver()
export class UserPostResolver {
  constructor(private userPostService: UserPostService) {}

  @Query(() => [UserPostGlType])
  @UseGuards(GqlAuthGuard)
  async getAllUserPosts(
    // @Args('input') input: AllCommentsByUserpostIdInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserPostGlType[]> {
    const userPosts = await this.userPostService.getAllUserPosts({
      username: currentUser.username,
      password: currentUser.password,
    });

    return userPosts;
  }

  @Query(() => UserPostGlType)
  @UseGuards(GqlAuthGuard)
  async getUserPostById(
    @Args('input') input: GetUserPostByIdInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserPostGlType> {
    const userpost = await this.userPostService.getUserPostById(
      { userPostId: input.userPostId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return userpost;
  }

  @Query(() => [UserPostGlType])
  @UseGuards(GqlAuthGuard)
  async getAllMyUserPosts(
    // @Args('input') input: AllCommentsByUserpostIdInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserPostGlType[]> {
    const userPosts = await this.userPostService.getAllMyUserPosts({
      username: currentUser.username,
      password: currentUser.password,
    });

    return userPosts;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async moveIntoTrashUserPost(
    @Args('input') input: MoveIntoTrashUserPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res = await this.userPostService.moveIntoTrashUserPost(
      { userPostId: input.userPostId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async likeOrDislikeUserPost(
    @Args('input') input: LikeOrDislikeUserPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res = await this.userPostService.likeOrDislikeUserPost(
      { userPostId: input.userPostId, like: input.like },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }

  @Query(() => [LikeOrDislikeUserPostGlType])
  @UseGuards(GqlAuthGuard)
  async getLikeOrDislikeUserPost(
    @Args('input') input: GetLikeOrDislikeUserPostInput,
    @CurrentUser() currentUser: User,
  ): Promise<LikeOrDislikeUserPostGlType[]> {
    const res = await this.userPostService.getLikeOrDislikeUserPost(
      { userPostId: input.userPostId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }
}
