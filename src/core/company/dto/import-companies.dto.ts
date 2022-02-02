import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { COMPANY_TYPE } from '../enum/company-type.enum';

export class ImportCompaniesDto {
  @ValidateNested()
  @Type(() => CompanyDto)
  companies: CompanyDto[];

  @IsNotEmpty()
  @IsIn(Object.values(COMPANY_TYPE))
  type: COMPANY_TYPE;
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
