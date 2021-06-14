import { IsNotEmpty, IsString } from 'class-validator';

export class UserRecoveryGetCodeDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
