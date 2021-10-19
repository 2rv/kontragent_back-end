import { IsNotEmpty, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class CompanyUpdatevErificateInfoDto {
  @IsNotEmpty()
  @IsBoolean()
  @MinLength(6)
  @MaxLength(100)
  newPassword: string;
}
