import { Injectable } from '@nestjs/common';
import { InviteEmailsDto } from './invite-emails.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class InviteService {
  constructor(private readonly mailerService: MailerService) {}

  private getTemplateLink(name: string) {
    return path.join(path.resolve(), `src/template/${name}.pug`);
  }

  async sendInvite(inviteEmailsDto: InviteEmailsDto) {
    console.log(inviteEmailsDto.data);
    return await this.mailerService
      .sendMail({
        to: inviteEmailsDto?.data,
        subject: `Приглашаем Вас!`,
        template: this.getTemplateLink('sendInviteToSeveralEmails'),
        context: {},
      })
      .catch((e) => {
        console.log(
          `SEND REFERRAL LINK TO NOT REGISTERED USER ERROR: ${JSON.stringify(
            e,
          )}`,
        );
      });
  }
}
