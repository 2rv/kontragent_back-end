import { CompanyEntity } from 'src/core/company/company.entity';
import { FileEntity } from 'src/core/file/file.entity';
import { RevisionEntity } from 'src/core/revision/revision.entity';

export interface GetRevisionDataDto {
  id: number;
  review?: string;
  fileReview?: FileEntity[];
  revision?: RevisionEntity;
  company: CompanyEntity;
}
