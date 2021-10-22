import { createParamDecorator } from '@nestjs/common';
import { ReferalEntity } from '../referal.entity';

export const GetReferal = createParamDecorator((data: string, context) => {
  const referal: ReferalEntity = context.switchToHttp().getRequest().referal;

  return data ? referal && referal[data] : referal;
});
