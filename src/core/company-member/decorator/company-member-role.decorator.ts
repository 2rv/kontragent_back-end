import { SetMetadata } from '@nestjs/common';
import { COMPANY_MEMBER_ROLE } from '../enum/company-member-role.enum';

export const CompanyMemberRoles = (...roles: COMPANY_MEMBER_ROLE[]) =>
  SetMetadata('companyMemberRoles', roles);
