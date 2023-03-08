import * as UnitPay from 'unitpay';

import { UnitPayConfig } from 'src/config/unitpay.config';

const u = new UnitPay(UnitPayConfig);

export const UnitpayGeneratePaymentLink = (
  price: number,
  orderId: number,
  paymentType: string = 'card',
) => {
  const description = 'kontragent';

  const priceNum = Number(price);
  const outdatedUrl = u.form(priceNum, orderId, description);
  const outdatedUrlParts = outdatedUrl.split('?');
  const uptodateUrl =
    outdatedUrlParts[0] + `/${paymentType}\?` + outdatedUrlParts[1];
  return uptodateUrl;
};
