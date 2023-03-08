import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../file/file.entity';
import { CreateNotificationEmailDto } from './dto/create-notification-email.dto';
import { NotificationService } from './notification.service';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CreateNotificationEveryoneDto } from './dto/create-notification-everyone.dto';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  createNotification(
    @Body(ValidationPipe)
    createNotificationEmailDto: CreateNotificationEmailDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.notificationService.createNotification(
      user,
      createNotificationEmailDto,
    );
  }

  @Post('/everyone')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  createNotificationEveryone(
    @Body(ValidationPipe)
    createNotificationEveryone: CreateNotificationEveryoneDto,
  ): Promise<void> {
    return this.notificationService.createNotificationEveryone(
      createNotificationEveryone,
    );
  }
}
