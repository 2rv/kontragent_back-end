import { REVISION_STATUS } from '../enum/revision-status.enum';

export interface GetCompanyRevisionListItemDto {
  id: number;

  title: string;

  description: string;

  status: REVISION_STATUS;

  price?: number;
}

export interface GetCompanyRevisionListDto {
  list: GetCompanyRevisionListItemDto[];
}
