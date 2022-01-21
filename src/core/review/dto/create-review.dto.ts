import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyEntity } from 'src/core/company/company.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  company: CompanyEntity;

  @IsNotEmpty()
  @IsString()
  review: string;

  @IsOptional()
  @IsString()
  createDate?: string;
}
