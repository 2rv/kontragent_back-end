import { IsOptional } from 'class-validator';
import { CompanyEntity } from 'src/core/company/company.entity';
import { RevisionCompanyEntity } from 'src/core/revision-company/revision-company.entity';
import { RevisionEntity } from 'src/core/revision/revision.entity';

export class CreateReviewDto {
  company: CompanyEntity;

  @IsOptional()
  revision?: RevisionEntity;

  @IsOptional()
  revisionCompany?: RevisionCompanyEntity;
}
