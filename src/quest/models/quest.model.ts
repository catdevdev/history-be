import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestGlType {
  @Field()
  content: string;
  @Field()
  isEnd: boolean;
  @Field()
  Quest_id: number;
  @Field()
  QuestNode_id: number;
}

@ObjectType()
export class QuestChoiceGlType {
  @Field()
   content: string;
  @Field()
   QuestNode_id: number;
  @Field()
   toQuestNode: number;
}
