import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetRolesOfUserInput {
  @Field()
  username: string;
}

@InputType()
export class GiveUserRoleInput {
  @Field()
  username: string;
  @Field()
  roleName: string;
}
