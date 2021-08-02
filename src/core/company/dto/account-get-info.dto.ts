import { IsNotEmpty, IsString } from 'class-validator';

export class AccountGetInfoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  inn: string;

  verification: boolean;
}
