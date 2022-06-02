import { Field, InputType } from '@nestjs/graphql';
import { Length, IsInt } from 'class-validator';

@InputType()
export class CreateQuestInput {
  @Field()
  @Length(2, 50)
  questDescription: string;
  @Field()
  @Length(2, 20)
  questName: string;
}

@InputType()
export class CreateQuestNodeInput {
  @Field()
  @IsInt()
  content: string;
  @Field()
  @IsInt()
  questId: number;
}

@InputType()
export class CreateQuestNodeChoiceInput {
  @Field()
  @Length(1, 1000)
  choiceContent: string;
  @Field()
  @IsInt()
  questId: number;
  @Field()
  @IsInt()
  questNodeFrom: number;
}

@InputType()
export class UpdateQuestNodeContentInput {
  @Field()
  content: string;
  @Field()
  questNodeId: number;
}

@InputType()
export class GetQuestNodeContentInput {
  @Field()
  questNodeId: number;
}

@InputType()
export class GetFirstQuestNodeInput {
  @Field()
  questId: number;
}
