import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { FileRepository } from '../file/file.repository';
import { CreateNotificationEmailDto } from './dto/create-notification-email.dto';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { NOTIFICATION_ERROR } from './enum/notification-error.enum';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { NotificationRepository } from './notification.repository';
import { FileService } from '../file/file.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(NotificationRepository)
    private noticationRepository: NotificationRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private fileService: FileService,
    private mailService: MailService,
  ) {}

  async createNotification(
    user: UserEntity,
    createNotificationEmailDto: CreateNotificationEmailDto,
  ): Promise<void> {
    const addressee = await this.userRepository.findOne({
      where: { email: createNotificationEmailDto.email },
    });

    if (addressee) {
      if (addressee.id === user.id)
        throw new BadRequestException(
          NOTIFICATION_ERROR.CANNOT_SEND_YOURSELF_MESSAGE,
        );

      if (addressee.role === USER_ROLE.ADMIN)
        throw new BadRequestException(
          NOTIFICATION_ERROR.CANNOT_SEND_MESSAGE_ROLE_ADMIN,
        );
    }

    if (!addressee)
      throw new BadRequestException(
        NOTIFICATION_ERROR.ADDRESSEE_EMAIL_NOT_FOUND,
      );

    const notification = await this.noticationRepository.createNotification(
      createNotificationEmailDto,
      addressee,
    );
    const fileList = [];
    const ids: number[] = createNotificationEmailDto.fileList;
    if (ids && ids.length > 0) {
      for (const i in ids) {
        fileList[i] = await this.fileRepository.assignFileToNotificationById(
          notification,
          ids[i],
        );
      }
    }

    createNotificationEmailDto.fileList = fileList;
    if (addressee) {
      this.mailService.sendNotificationEmail(createNotificationEmailDto);
    }
  }
}
