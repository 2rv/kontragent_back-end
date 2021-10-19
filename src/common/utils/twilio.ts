import { TwilioConfig } from 'src/config/twilio.config';
import { Twilio } from 'twilio';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken, {
  lazyLoading: true,
  logLevel: 'debug',
});

export function TwilioSendSMS(body: string, to: string) {
  return client.messages
    .create({
      body,
      messagingServiceSid: TwilioConfig.messagingServiceSid,
      to,
    })
    .then((message) => console.log(message.sid));
}
