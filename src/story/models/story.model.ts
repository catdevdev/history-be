import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HistoryGlType {
  @Field()
  User_id: number;
  @Field()
  Story_id: number;
  @Field()
  content: string;
  @Field()
  UserPost_id: number;
  @Field()
  title: string;
  @Field()
  userpostType: string;
  @Field()
  description: string;
  @Field()
  inReview: boolean;
  @Field()
  isBanned: boolean;
  @Field()
  isPublished: boolean;
  @Field()
  inTrash: boolean;
  @Field()
  imageCover: string;
}
