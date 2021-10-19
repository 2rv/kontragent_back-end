import * as UnitPay from 'unitpay';

import { UnitPayConfig } from 'src/config/unitpay.config';

const u = new UnitPay(UnitPayConfig);

export const UnitpayGeneratePaymentLink = (price: number, orderId: number) => {
  const description = 'kontragent';

  const priceNum = Number(price);
  return u.form(priceNum, orderId, description);
};
