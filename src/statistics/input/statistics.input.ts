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

@InputType()
export class WriteNumberOfViewsByUserpostInput {
  @Field()
  userPostId: number;
}

@InputType()
export class GetNumberOfViewsByUserpostInput {
  @Field()
  userPostId: number;
}
