import { Module } from '@nestjs/common';
import { RevisionController } from './revision-share.controller';
import { RevisionService } from './revision-share.service';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [AuthModule, FileModule, MailModule],
  providers: [RevisionService],
  exports: [RevisionService],
  controllers: [RevisionController],
})
export class RevisionShare {}
