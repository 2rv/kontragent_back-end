import { CompanyEntity } from "src/core/company/company.entity";

export interface GetReviewListItemDto {
  id: number;
  company: CompanyEntity;
}

export interface GetReviewListDto {
  list: GetReviewListItemDto[];
}
