import { Module, forwardRef } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from '../../config/mail.config';

@Module({
  imports: [MailerModule.forRoot(MailConfig)],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
