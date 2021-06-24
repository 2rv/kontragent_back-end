import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  inn: string;
}
