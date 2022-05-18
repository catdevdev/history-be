import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/dto/users.dto';
import {
  AddCommentInput,
  AllCommentsByUserpostIdInput,
  BanCommentInput,
  UnbanCommentInput,
} from './input/story.input';
import { UserPostCommentGlType } from './models/user-post.model';
import { UserPostCommentsService } from './user-post-comments.service';

@Resolver()
export class UserPostCommentsResolver {
  constructor(private userPostCommentsService: UserPostCommentsService) {}

  @Query(() => [UserPostCommentGlType])
  @UseGuards(GqlAuthGuard)
  async allCommentsByUserpostId(
    @Args('input') input: AllCommentsByUserpostIdInput,
    @CurrentUser() currentUser: User,
  ): Promise<UserPostCommentGlType[]> {
    const comments = await this.userPostCommentsService.allCommentsByUserpostId(
      { userPostId: input.userPostId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return comments;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async addComment(
    @Args('input') input: AddCommentInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const comments = await this.userPostCommentsService.addComment(
      { userPostId: input.userPostId, content: input.content },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return comments;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async heartComment(
    @Args('input') input: BanCommentInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res = await this.userPostCommentsService.heartComment(
      { commentId: input.commentId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }

  @Mutation(() => Number)
  @UseGuards(GqlAuthGuard)
  async banComment(
    @Args('input') input: UnbanCommentInput,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    const res = await this.userPostCommentsService.banComment(
      { commentId: input.commentId },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }
}
