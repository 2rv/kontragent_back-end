import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { AuthModule } from '../auth/auth.module';
import { NotificationRepository } from './notification.repository';
import { NotificationEntity } from './notification.entity';
import { FileEntity } from '../file/file.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { FileService } from '../file/file.service';
import { MailModule } from '../mail/mail.module';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    AuthModule,
    MailModule,
    TypeOrmModule.forFeature([
      FileRepository,
      FileEntity,
      NotificationRepository,
      NotificationEntity,
      UserRepository,
      UserEntity,
    ]),
  ],

  controllers: [NotificationController],
  providers: [NotificationService, FileService],
  exports: [NotificationService],
})
export class NotificationModule {}
