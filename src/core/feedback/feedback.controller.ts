import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { UserEntity } from '../user/user.entity';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { FeedbackService } from './feedback.service';
import { FeedbackCreateDto } from './dto/create-feedback.dto';
import { GetFeedback } from './decorator/get-feedback.decorator';
import { FeedbackEntity } from './feedback.entity';
import { GetAdminFeedbackListDto } from './dto/get-admin-feedback-list.dto';
import { FeedbackGuard } from './guard/feedback.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AccountGuard)
  createFeedback(
    @Body(ValidationPipe) feedbackCreateDto: FeedbackCreateDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.feedbackService.createFeedback(feedbackCreateDto, user);
  }

  @Get('/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminFeedbackList(): Promise<GetAdminFeedbackListDto> {
    return this.feedbackService.getAdminFeedbackList();
  }

  @Get('/:feedbackId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, FeedbackGuard)
  getAdminFeedbackInfo(
    @GetFeedback() feedback: FeedbackEntity,
  ): Promise<FeedbackEntity> {
    return this.feedbackService.getAdminFeedbackInfo(feedback);
  }
}
