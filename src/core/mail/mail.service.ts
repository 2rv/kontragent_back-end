import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

import { SendReferralLinkDto } from '../referral/dto/send-referral-link.dto';
import { ReferrerEntity } from '../referrer/referrer.entity';

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

  async sendReferralLinkEmailToNotRegisteredUser(
    sendReferralLinkDto: SendReferralLinkDto,
    referrer: ReferrerEntity,
  ) {
    return await this.mailerService
      .sendMail({
        to: sendReferralLinkDto.email,
        subject: `${referrer.user.firstname} ${referrer.user.lastname} приглашает Вас!`,
        template: this.getTemplateLink(
          'sendReferralLinkEmailToNotRegisteredUser',
        ),
        context: {
          email: sendReferralLinkDto.email,
          firstName: referrer.user.firstname,
          lastName: referrer.user.lastname,
          referrerId: referrer.id,
        },
      })
      .catch((e) => {
        console.log(
          `SEND REFERRAL LINK TO NOT REGISTERED USER ERROR: ${JSON.stringify(
            e,
          )}`,
        );
      });
  }

  async sendReferralLinkEmailToRegisteredUser(
    sendReferralLinkDto: SendReferralLinkDto,
    referrer: ReferrerEntity,
  ) {
    return await this.mailerService
      .sendMail({
        to: sendReferralLinkDto.email,
        subject: `${referrer.user.firstname} ${referrer.user.lastname} приглашает Вас!`,
        template: this.getTemplateLink('sendReferralLinkEmailToRegisteredUser'),
        context: {
          email: sendReferralLinkDto.email,
          firstName: referrer.user.firstname,
          lastName: referrer.user.lastname,
          referrerId: referrer.id,
        },
      })
      .catch((e) => {
        console.log(
          `SEND REFERRAL LINK TO REGISTERED USER ERROR: ${JSON.stringify(e)}`,
        );
      });
  }

  private getTemplateLink(name: string) {
    return path.join(path.resolve(), `src/template/${name}.pug`);
  }
}
