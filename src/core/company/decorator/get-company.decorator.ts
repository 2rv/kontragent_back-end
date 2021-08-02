import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyEntity } from '../company.entity';

export const GetCompany = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { companyAccount }: { companyAccount: CompanyEntity } = request;

    const company: CompanyEntity = companyAccount;

    return data ? company && company[data] : company;
  },
);
