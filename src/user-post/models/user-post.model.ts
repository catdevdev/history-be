import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPostGlType {
  @Field()
  UserPost_id: number;
  @Field()
  title: string;
  @Field()
  userpostType: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  imageCover: string;
}
