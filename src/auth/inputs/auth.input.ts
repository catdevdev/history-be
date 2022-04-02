import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterReq {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

@InputType()
export class AuthReq {
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsNotEmpty()
  password: string;
}

// @InputType()
// export class AuthReq {
//   body: Body;
// }