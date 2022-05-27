import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticGlType {
  @Field()
  User_id: number;
  @Field()
  loggedAt: Date;
  @Field()
  ipAddress: string;
  @Field()
  systemName: string;
}

@ObjectType()
export class UserPostStatisticGlType {
  @Field()
  User_id: number;
  @Field()
  UserPost_id: number;
  @Field()
  action: string;
  @Field()
  createdAt: Date;
}
