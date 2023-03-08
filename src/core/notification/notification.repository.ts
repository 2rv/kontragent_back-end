import { Repository, EntityRepository } from 'typeorm';
import { CreateNotificationEmailDto } from './dto/create-notification-email.dto';
import { NotificationEntity } from './notification.entity';
import { UserEntity } from '../user/user.entity';
import { NOTIFICATION_TYPE } from './enum/notification-type.enum';
import { CreateNotificationEveryoneDto } from './dto/create-notification-everyone.dto';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
  async createNotification(
    createNotificationEmailDto: CreateNotificationEmailDto,
    addressee: UserEntity,
  ): Promise<NotificationEntity> {
    const { message } = createNotificationEmailDto;

    const notification: NotificationEntity = new NotificationEntity();

    notification.user = addressee;
    notification.message = message;
    notification.type = NOTIFICATION_TYPE.EMAIL;

    await notification.save();

    return notification;
  }

  async createNotificationEveryOne(
    createNotificationEveryone: CreateNotificationEveryoneDto,
  ): Promise<NotificationEntity> {
    const { message } = createNotificationEveryone;

    const notification: NotificationEntity = new NotificationEntity();

    notification.message = message;
    notification.type = NOTIFICATION_TYPE.MAILING;

    await notification.save();

    return notification;
  }
}
