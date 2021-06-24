import { createParamDecorator } from '@nestjs/common';
import { CompanyEntity } from '../company.entity';

interface RequestData extends Request {
  companyAccount: CompanyEntity;
}

export const GetCompany = createParamDecorator(
  (data: string, request: RequestData) => {
    const company: CompanyEntity = request.companyAccount;

    return data ? company && company[data] : company;
  },
);
