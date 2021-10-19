import { createParamDecorator } from '@nestjs/common';
import { CompanyMemberEntity } from '../company-memeber.entity';

export const GetCompanyMember = createParamDecorator(
  (data: string, context) => {
    const user: CompanyMemberEntity = context
      .switchToHttp()
      .getRequest().companyMember;

    return data ? user && user[data] : user;
  },
);
