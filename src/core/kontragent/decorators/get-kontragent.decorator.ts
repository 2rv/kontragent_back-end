import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { KontragentEntity } from '../kontragent.entity';

export const GetKontragent = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { kontragent }: { kontragent: KontragentEntity } = request;

    return data ? kontragent && kontragent[data] : kontragent;
  },
);
