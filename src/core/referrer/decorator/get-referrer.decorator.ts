import { createParamDecorator } from '@nestjs/common';
import { ReferrerEntity } from '../referrer.entity';

export const GetReferrer = createParamDecorator((data: string, context) => {
  const referrer: ReferrerEntity = context.switchToHttp().getRequest().referrer;

  return data ? referrer && referrer[data] : referrer;
});
