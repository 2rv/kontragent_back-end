import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyEntity } from 'src/core/company/company.entity';
import { COMPANY_TYPE } from 'src/core/company/enum/company-type.enum';

export class CreateReviewDto {
  @IsNotEmpty()
  company: CompanyEntity;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsOptional()
  @IsString()
  createDate?: string;

  @IsOptional()
  @IsIn(Object.values(COMPANY_TYPE))
  type?: COMPANY_TYPE;
}
