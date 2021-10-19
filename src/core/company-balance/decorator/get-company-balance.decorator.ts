import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyBalanceEntity } from '../company-balance.entity';

export const GetCompanyBalance = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { companyBalance }: { companyBalance: CompanyBalanceEntity } =
      request;

    return data ? companyBalance && companyBalance[data] : companyBalance;
  },
);
