import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateKontragentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(\d{10}|\d{12})$/, { message: 'COMPANY_INN' })
  inn: string;
}
