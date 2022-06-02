import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HistoryGlType {
  @Field()
   content: string;
  @Field()
   description: string;
  @Field({ nullable: true })
   imageCover: string;
  @Field()
   inReview: boolean;
  @Field()
   inTrash: boolean;
  @Field()
   isBanned: boolean;
  @Field()
   isPublished: boolean;
  @Field()
   Story_id: number;
  @Field()
   title: string;
  @Field()
   User_id: number;
  @Field()
   UserPost_id: number;
}
