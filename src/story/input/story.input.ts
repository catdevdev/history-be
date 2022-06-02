import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetStoryInput {
  @Field()
  storyId: number;
}

@InputType()
export class CreateStoryInput {
  @Field({ nullable: true })
  storyDescription: string;
  @Field()
  storyName: string;
}

@InputType()
export class UpdateStoryContent {
  @Field()
  storyContent: string;
  @Field()
  storyId: number;
}
