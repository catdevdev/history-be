import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestGlType {
  @Field()
  Quest_id: number;
  @Field()
  QuestNode_id: number;
  @Field()
  isEnd: boolean;
  @Field()
  content: string;
}

@ObjectType()
export class QuestChoiceGlType {
  @Field()
  QuestNode_id: number;
  @Field()
  content: string;
  @Field()
  toQuestNode: number;
}
