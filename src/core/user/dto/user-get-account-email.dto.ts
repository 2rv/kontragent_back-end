import { IsNotEmpty, IsString } from 'class-validator';

export class UserGetAccountEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
