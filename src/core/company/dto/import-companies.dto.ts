import { IsIn, IsOptional } from 'class-validator';
import { COMPANY_TYPE } from '../enum/company-type.enum';

export class ImportCompaniesDto {
  companies: CompanyDto[];

  @IsOptional()
  @IsIn(Object.values(COMPANY_TYPE))
  type: COMPANY_TYPE;
}
class CompanyDto {
  inn: string;

  name?: string;

  review: string;

  createDate?: string;
}
