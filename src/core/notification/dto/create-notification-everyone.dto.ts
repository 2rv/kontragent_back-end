import { ArrayMaxSize, IsNumber, IsOptional, Length } from 'class-validator';
import { NOTIFICATION_ERROR } from '../enum/notification-error.enum';

export class CreateNotificationEveryoneDto {
  @IsOptional()
  @Length(10, 1000000, {
    message: NOTIFICATION_ERROR.NOTIFICATION_MESSAGE_MIN_10,
  })
  message: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  fileList?: number[];
}
