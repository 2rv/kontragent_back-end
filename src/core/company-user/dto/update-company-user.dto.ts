import { COMPANY_USER_ROLE } from '../enum/company-user-role.enum';

export interface UpdateCompanyUserDto {
  position: string;
  role: COMPANY_USER_ROLE;
}
