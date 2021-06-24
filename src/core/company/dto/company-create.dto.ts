import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  inn: string;
}
