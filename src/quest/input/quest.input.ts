import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestInput {
  @Field()
  questName: string;
  @Field()
  questDescription: string;
}

@InputType()
export class CreateQuestNodeInput {
  @Field()
  questId: number;
  @Field()
  content: string;
}

@InputType()
export class CreateQuestNodeChoiceInput {
  @Field()
  questId: number;
  @Field()
  questNodeFrom: number;
  @Field()
  choiceContent: string;
}

@InputType()
export class UpdateQuestNodeContentInput {
  @Field()
  questNodeId: number;
  @Field()
  content: string;
}

@InputType()
export class GetQuestNodeContentInput {
  @Field()
  questNodeId: number;
}
