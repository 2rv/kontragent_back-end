import { IsNotEmpty, IsString } from 'class-validator';
export class UserSettingsUpdatePhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}
