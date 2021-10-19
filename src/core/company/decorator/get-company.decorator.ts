import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyEntity } from '../company.entity';

export const GetCompany = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { company }: { company: CompanyEntity } = request;

    return data ? company && company[data] : company;
  },
);
