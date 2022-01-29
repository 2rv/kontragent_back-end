import { CompanyEntity } from 'src/core/company/company.entity';
import { FileEntity } from 'src/core/file/file.entity';

export interface GetReviewListItemDto {
  id: number;
  company: CompanyEntity;
  review: string;
  fileReview?: FileEntity[];
}

export interface GetReviewListDto {
  list: GetReviewListItemDto[];
}
