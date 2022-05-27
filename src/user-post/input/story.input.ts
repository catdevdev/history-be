import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class GetUserPostByIdInput {
  @Field()
  userPostId: number;
}

@InputType()
export class AllCommentsByUserpostIdInput {
  @Field()
  userPostId: number;
}

@InputType()
export class AddCommentInput {
  @Field()
  userPostId: number;
  @Field()
  content: string;
}

@InputType()
export class BanCommentInput {
  @Field()
  commentId: number;
}
@InputType()
export class UnbanCommentInput {
  @Field()
  commentId: number;
}

@InputType()
export class GenreInput {
  @Field()
  userPostId: number;
  @Field()
  genreId: number;
}

@InputType()
export class CategoryInput {
  @Field()
  userPostId: number;
  @Field()
  categoryId: number;
}

@InputType()
export class AddCategoryToUserPostInput {
  @Field()
  userPostId: number;
  @Field()
  categoryId: number;
}

@InputType()
export class AddGenreToUserPostInput {
  @Field()
  userPostId: number;
  @Field()
  genreId: number;
}

//

@InputType()
export class MoveIntoTrashUserPostInput {
  @Field()
  userPostId: number;
}

@InputType()
export class LikeOrDislikeUserPostInput {
  @Field()
  userPostId: number;
  @Field()
  like: boolean;
}

@InputType()
export class GetLikeOrDislikeUserPostInput {
  @Field()
  userPostId: number;
}
