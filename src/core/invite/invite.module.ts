import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from '../../config/mail.config';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteRepository } from './inivite.repository';
import { InviteEntity } from './invite.entity';

@Module({
  imports: [
    MailerModule.forRoot(MailConfig),
    AuthModule,
    TypeOrmModule.forFeature([InviteEntity, InviteRepository]),
  ],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
