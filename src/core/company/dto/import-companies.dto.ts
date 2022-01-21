import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class ImportCompaniesDto {
  @ValidateNested()
  @Type(() => CompanyDto)
  companies: CompanyDto[];
}
class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\d{10}|\d{12})$/, { message: 'COMPANY_INN' })
  inn: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsOptional()
  @IsString()
  createDate?: string;
}
