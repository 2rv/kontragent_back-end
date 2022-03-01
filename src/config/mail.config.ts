import * as path from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as config from 'config';

const MAIL_CONFIG = config.get('MAIL');

const miniConfig = {
  mailLogin: process.env.MAIL_LOGIN || MAIL_CONFIG.MAIL_LOGIN,
  mailPassword: process.env.MAIL_PASSWORD || MAIL_CONFIG.MAIL_PASSWORD,
  mailConfig: {
    host: process.env.MAIL_HOST || MAIL_CONFIG.MAIL_HOST,
    port: process.env.MAIL_PORT || MAIL_CONFIG.MAIL_PORT,
    service: process.env.MAIL_SERVICE || MAIL_CONFIG.MAIL_SERVICE,
  },
};

export const MailConfig = {
  transport: {
    // service: miniConfig.mailConfig.service,
    host: miniConfig.mailConfig.host,
    auth: {
      user: miniConfig.mailLogin,
      pass: miniConfig.mailPassword,
    },
  },
  defaults: {
    from: `Kontragent <${miniConfig.mailLogin}>`,
  },
  template: {
    dir: path.join(path.resolve(), 'src/template/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
