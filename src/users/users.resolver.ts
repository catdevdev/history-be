import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGqType } from './model/user.model';
import { UserInput } from './inputs/user.input';
import { UsersService } from './users.service';

import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './dto/users.dto';

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
}
