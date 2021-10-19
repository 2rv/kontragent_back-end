import * as config from 'config';

const UNITPAY_CONFIG = config.get('UNITPAY');

export const UnitPayConfig = {
  secretKey:
    process.env.UNITPAY_PAYMENT_SIGNATURE || UNITPAY_CONFIG.PAYMENT_SIGNATURE,
  publicKey: process.env.UNITPAY_PAYMENT_ID || UNITPAY_CONFIG.PAYMENT_ID,
};
