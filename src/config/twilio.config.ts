import * as config from 'config';

const TWILIO_CONFIG = config.get('TWILIO');

export const TwilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || TWILIO_CONFIG.ACCOUNT_SID,
  messagingServiceSid:
    process.env.TWILIO_SERVICE_SID || TWILIO_CONFIG.SERVICE_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN || TWILIO_CONFIG.AUTH_TOKEN,
};
