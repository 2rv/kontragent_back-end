import { COMPANY_USER_ROLE } from '../enum/company-user-role.enum';

export interface CompanyUserCreateDto {
  position: string;
  role: COMPANY_USER_ROLE;
}
