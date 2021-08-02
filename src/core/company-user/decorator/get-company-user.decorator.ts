import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyUserEntity } from '../company-user.entity';

export const GetCompanyUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const {
      requestedCompanyUserAccount,
    }: { requestedCompanyUserAccount: CompanyUserEntity } = request;

    const companyUser: CompanyUserEntity = requestedCompanyUserAccount;

    return data ? companyUser && companyUser[data] : companyUser;
  },
);
