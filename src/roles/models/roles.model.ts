import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleGlType {
  @Field()
  roleName: string;
}
