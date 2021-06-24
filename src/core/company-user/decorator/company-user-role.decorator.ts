import { SetMetadata } from '@nestjs/common';

export const CompanyUserRoles = (...roles: number[]) =>
  SetMetadata('companyUserRoles', roles);
