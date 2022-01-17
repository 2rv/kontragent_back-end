import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10,10}$/, { message: 'COMPANY_INN' })
  inn: string;
}
