import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGqType } from './model/user.model';
import {
  FindOneByUsernameIdInput,
  FindOneByUsernameInput,
  UserInput,
} from './inputs/user.input';
import { UsersService } from './users.service';

import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './dto/users.dto';
import { AllCommentsByUserpostIdInput } from 'src/user-post/input/story.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserGqType)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() currentUser: User) {
    return this.usersService.currentUser(
      currentUser.username,
      currentUser.password,
    );
  }

  @Query(() => UserGqType)
  @UseGuards(GqlAuthGuard)
  async findOneByUsername(
    @Args('input') input: FindOneByUsernameInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.usersService.findOneByUsername(
      { username: input.username },
      { username: currentUser.username, password: currentUser.password },
    );
  }

  @Query(() => UserGqType)
  @UseGuards(GqlAuthGuard)
  async findOneByUsernameId(
    @Args('input') input: FindOneByUsernameIdInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.usersService.findOneByUsernameId(
      { username_id: input.username_id },
      { username: currentUser.username, password: currentUser.password },
    );
  }
}
