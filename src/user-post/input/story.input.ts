import { Field, InputType } from '@nestjs/graphql';

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
