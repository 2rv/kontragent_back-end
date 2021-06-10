import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
