import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
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
