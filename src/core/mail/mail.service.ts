import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserVerificationCodeEmail(email: string, code: string) {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Смена пароля',
        template: this.getTemplateLink('userVerificationCodeEmail'),
        context: {
          mail: email,
          code: code,
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private getTemplateLink(name: string) {
    return path.join(path.resolve(), `src/template/${name}.pug`);
  }
}
