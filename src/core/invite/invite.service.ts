import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteDto } from './dto/invite.dto';
import { InviteRepository } from './inivite.repository';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class InviteService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(InviteRepository)
    private iniviteRepository: InviteRepository,
  ) {}

  private getTemplateLink(name: string) {
    return path.join(path.resolve(), `src/template/${name}.pug`);
  }

  async sendInvite(emails: Array<string>) {
    console.log(emails);
    return await this.mailerService
      .sendMail({
        to: emails,
        subject: `Приглашаем Вас!`,
        template: this.getTemplateLink('sendInviteToSeveralEmails'),
        context: {},
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  async invite(inviteDto: InviteDto): Promise<void> {
    await this.iniviteRepository.invite(inviteDto);
  }
}
