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

@ObjectType()
export class UserPostCommentGlType {
  @Field()
  UserPost_id: number;
  @Field()
  content: string;
  @Field()
  isBanned: boolean;
  @Field()
  Comment_id: number;
  @Field()
  username: string;
  @Field()
  imageAvatar: string;
  @Field()
  createdAt: string;
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
