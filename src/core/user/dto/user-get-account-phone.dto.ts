import { IsNotEmpty, IsString } from 'class-validator';

export class UserGetAccountPhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}
