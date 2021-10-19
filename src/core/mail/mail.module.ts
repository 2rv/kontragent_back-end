import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConfig } from '../../config/mail.config';

@Module({
  imports: [MailerModule.forRoot(MailConfig)],
  providers: [MailService],
  controllers: [],
  exports: [MailService],
})
export class MailModule {}
