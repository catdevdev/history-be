import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPostGlType {
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  imageCover: string;
  @Field()
  title: string;
  @Field()
  UserPost_id: number;
  @Field()
  userpostType: string;
}

@ObjectType()
export class UserPostCommentGlType {
  @Field()
  Comment_id: number;
  @Field()
  content: string;
  @Field()
  createdAt: string;
  @Field()
  imageAvatar: string;
  @Field()
  isBanned: boolean;
  @Field()
  username: string;
  @Field()
  UserPost_id: number;
}

@ObjectType()
export class LikeOrDislikeUserPostGlType {
  @Field()
  isLike: boolean;
  @Field()
  User_id: number;
  @Field()
  UserPost_id: number;
}
