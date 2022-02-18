import { Module } from '@nestjs/common';
import { PdfShareController } from './pdf-share.controller';
import { PdfShareService } from './pdf-share.service';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [AuthModule, FileModule, MailModule],
  providers: [PdfShareService],
  exports: [PdfShareService],
  controllers: [PdfShareController],
})
export class PdfShareModule {}
