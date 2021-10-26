import { createParamDecorator } from '@nestjs/common';
import { CompanyMemberEntity } from '../company-memeber.entity';

export const GetParamCompanyMember = createParamDecorator(
  (data: string, context) => {
    const companyMember: CompanyMemberEntity = context
      .switchToHttp()
      .getRequest().paramCompanyMember;

    return data ? companyMember && companyMember[data] : companyMember;
  },
);
