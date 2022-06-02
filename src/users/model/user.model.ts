import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserGqType {
  @Field()
   email: string;
  @Field({ nullable: true })
   imageAvatar: string;
  @Field(() => [String])
   roles: string[];
  @Field(() => ID)
   User_id: number;
  @Field()
   username: string;
}
