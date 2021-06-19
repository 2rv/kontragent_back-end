import { IsNotEmpty, IsString } from 'class-validator';

export class UserRecoveryGetEmailCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
