import { COMPANY_USER_ROLE } from '../enum/company-user-role.enum';

export interface CompanyUserCreateDto {
  userId: number;
  role: COMPANY_USER_ROLE;
}
