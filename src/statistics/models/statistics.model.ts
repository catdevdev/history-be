import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticGlType {
  @Field()
   ipAddress: string;
  @Field()
   loggedAt: Date;
  @Field()
   systemName: string;
  @Field()
   User_id: number;
}

@ObjectType()
export class UserPostStatisticGlType {
  @Field()
   action: string;
  @Field()
   createdAt: Date;
  @Field()
   User_id: number;
  @Field()
   UserPost_id: number;
}
