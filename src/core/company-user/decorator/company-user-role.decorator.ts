import { SetMetadata } from '@nestjs/common';
import { COMPANY_USER_ROLE } from '../enum/company-user-role.enum';

export const CompanyUserRoles = (...roles: COMPANY_USER_ROLE[]) =>
  SetMetadata('companyUserRoles', roles);
