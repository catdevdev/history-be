import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WriteStatisticAboutLoggingUserInput {
  @Field()
  ipAddress: string;
  @Field()
  systemName: string;
}

@InputType()
export class GetStatisticAboutLoggingUserInput {
  @Field()
  username: string;
}
