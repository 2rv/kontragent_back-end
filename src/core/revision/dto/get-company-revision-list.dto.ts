import { REVISION_STATUS } from '../enum/revision-status.enum';

export interface GetCompanyRevisionListItemDto {
  id: number;
  status: REVISION_STATUS;
}

export interface GetCompanyRevisionListDto {
  list: GetCompanyRevisionListItemDto[];
}
