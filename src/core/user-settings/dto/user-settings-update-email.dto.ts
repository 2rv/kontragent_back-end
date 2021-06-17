import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class UserSettingsUpdateEmailDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email: string;
}
