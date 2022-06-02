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
  content: string;
  @Field()
  userPostId: number;
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
  genreId: number;
  @Field()
  userPostId: number;
}

@InputType()
export class CategoryInput {
  @Field()
  categoryId: number;
  @Field()
  userPostId: number;
}

@InputType()
export class AddCategoryToUserPostInput {
  @Field()
   categoryId: number;
  @Field()
   userPostId: number;
}

@InputType()
export class AddGenreToUserPostInput {
  @Field()
   genreId: number;
  @Field()
   userPostId: number;
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
  like: boolean;
  @Field()
  userPostId: number;
}

@InputType()
export class GetLikeOrDislikeUserPostInput {
  @Field()
  userPostId: number;
}
