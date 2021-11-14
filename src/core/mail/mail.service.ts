import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

import { SendReferalMemberLinkDto } from '../referal-member/dto/send-referal-member-link.dto';
import { ReferalEntity } from '../referal/referal.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserVerificationCodeEmail(email: string, code: string) {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Верификация почты',
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
    sendReferalMemberLinkDto: SendReferalMemberLinkDto,
    referal: ReferalEntity,
  ) {
    return await this.mailerService
      .sendMail({
        to: sendReferalMemberLinkDto.credential,
        subject: `${referal.user.firstname} ${referal.user.lastname} приглашает Вас!`,
        template: this.getTemplateLink(
          'sendReferralLinkEmailToNotRegisteredUser',
        ),
        context: {
          email: sendReferalMemberLinkDto.credential,
          firstName: referal.user.firstname,
          lastName: referal.user.lastname,
          referalId: referal.id,
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
    sendReferalMemberLinkDto: SendReferalMemberLinkDto,
    referal: ReferalEntity,
  ) {
    return await this.mailerService
      .sendMail({
        to: sendReferalMemberLinkDto.credential,
        subject: `${referal.user.firstname} ${referal.user.lastname} приглашает Вас!`,
        template: this.getTemplateLink('sendReferralLinkEmailToRegisteredUser'),
        context: {
          email: sendReferalMemberLinkDto.credential,
          firstName: referal.user.firstname,
          lastName: referal.user.lastname,
          referalId: referal.id,
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
