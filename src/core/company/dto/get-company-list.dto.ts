import { CompanyEntity } from '../company.entity';
import { COMPANY_TYPE } from '../enum/company-type.enum';

export type GetCompanyListDto = {
  list: CompanyEntity[];
};

export type GetCompanyListParamsDto = {
  skip?: number;
  take?: number;
  type?: COMPANY_TYPE;
  registered?: boolean;
};

export type GetCompanyAdminListDto = {
  list: CompanyEntity[];
  count: number;
  skip: number;
  take: number;
  type: COMPANY_TYPE;
};
