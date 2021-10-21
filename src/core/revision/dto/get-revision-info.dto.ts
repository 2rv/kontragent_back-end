import { FileEntity } from 'src/core/file/file.entity';
import { REVISION_STATUS } from '../enum/revision-status.enum';

export interface GetRevisionInfoDto {
  id: number;

  title: string;

  description: string;

  status: REVISION_STATUS;

  review?: string;

  price?: number;

  fileDescription?: FileEntity[];

  fileReview?: FileEntity[];
}

export interface GetRevisionListInfoDto {
  list: GetRevisionInfoDto[];
}
