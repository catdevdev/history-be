import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/dto/users.dto';
import { GetRolesOfUserInput, GiveUserRoleInput } from './input/roles.input';
import { RoleGlType } from './models/roles.model';
import { RolesService } from './roles.service';

@Resolver()
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => [RoleGlType])
  async getRolesOfUser(
    @Args('input') input: GetRolesOfUserInput,
    @CurrentUser() currentUser: User,
  ): Promise<RoleGlType[]> {
    const roles = await this.rolesService.getRolesOfUser(input.username, {
      username: currentUser.username,
      password: currentUser.password,
    });

    return roles.map((role) => {
      return { roleName: role };
    });
  }

  @Mutation(() => String)
  async giveUserRole(
    @Args('input') input: GiveUserRoleInput,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    const res = await this.rolesService.give_user_role(
      {
        username: input.username,
        roleName: input.roleName,
      },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    console.log(res);

    return res;
  }

  @Mutation(() => String)
  async removeUserRole(
    @Args('input') input: GiveUserRoleInput,
    @CurrentUser() currentUser: User,
  ): Promise<string> {
    const res = await this.rolesService.remove_user_role(
      {
        username: input.username,
        roleName: input.roleName,
      },
      {
        username: currentUser.username,
        password: currentUser.password,
      },
    );

    return res;
  }
}
