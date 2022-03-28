import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HistoryGlType {
  @Field()
  warehouseId: string;
  @Field()
  boxOnSubstrate: boolean;
  @Field()
  speed: number;
}
