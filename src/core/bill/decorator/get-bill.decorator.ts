import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BillEntity } from '../bill.entity';

export const GetBill = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { bill }: { bill: BillEntity } = request;

    return data ? bill && bill[data] : bill;
  },
);
