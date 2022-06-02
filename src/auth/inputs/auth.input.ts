import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsLowercase,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class RegisterReq {
  @MinLength(7)
  @MaxLength(30)
  @IsNotEmpty()
  @IsLowercase()
  email: string;
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  @IsLowercase()
  password: string;
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @IsLowercase()
  username: string;
}

@InputType()
export class AuthReq {
  @IsNotEmpty()
  @IsLowercase()
  password: string;
  @IsNotEmpty()
  @IsLowercase()
  User_id: number;

  @IsNotEmpty()
  @IsLowercase()
  username: string;
}
