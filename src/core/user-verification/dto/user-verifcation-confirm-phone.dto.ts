import { IsNotEmpty, IsString } from 'class-validator';

export class UserVerificationConfirmPhoneDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
