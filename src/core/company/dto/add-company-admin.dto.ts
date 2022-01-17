import { IsNotEmpty, IsString } from 'class-validator';

export class AddCompanyAdminDto {
  @IsNotEmpty()
  @IsString()
  inn: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsString()
  createDate: string;
}
