import { IsNotEmpty, IsString } from 'class-validator';

export class UserRecoveryChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
