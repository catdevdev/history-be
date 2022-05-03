import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field()
  storyName: string;
  @Field({ nullable: true })
  storyDescription: string;
}

@InputType()
export class UpdateStoryContent {
  @Field()
  storyId: number;
  @Field()
  storyContent: string;
}
