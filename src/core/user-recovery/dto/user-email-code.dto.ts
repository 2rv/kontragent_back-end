import { IsNotEmpty, IsString } from 'class-validator';

export class UserEmailCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
