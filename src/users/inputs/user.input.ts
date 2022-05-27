import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class FindOneByUsernameInput {
  @Field()
  username: string;
}

@InputType()
export class FindOneByUsernameIdInput {
  @Field()
  username_id: number;
}
