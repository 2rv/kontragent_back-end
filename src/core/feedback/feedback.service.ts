import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackRepository } from './feedback.repository';
import { FileRepository } from '../file/file.repository';
import { UserEntity } from '../user/user.entity';
import { FeedbackCreateDto } from './dto/create-feedback.dto';
import { FeedbackEntity } from './feedback.entity';
import { GetAdminFeedbackListDto } from './dto/get-admin-feedback-list.dto';
import { UpdateFeedbackStatusDto } from './dto/update-feedback-status.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackRepository)
    private feedbackRepository: FeedbackRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async createFeedback(
    feedbackCreateDto: FeedbackCreateDto,
    user: UserEntity,
  ): Promise<void> {
    const feedback = await this.feedbackRepository.createFeedback(
      feedbackCreateDto,
      user,
    );

    const ids: number[] = feedbackCreateDto.files;
    if (ids && ids.length > 0) {
      for (const i in ids) {
        await this.fileRepository.assignFileToFeedbackById(feedback, ids[i]);
      }
    }
  }

  async getAdminFeedbackList(): Promise<GetAdminFeedbackListDto> {
    const list: FeedbackEntity[] =
      await this.feedbackRepository.getAdminFeedbackList();
    return { list };
  }

  async getAdminFeedbackListToday(): Promise<GetAdminFeedbackListDto> {
    const list: FeedbackEntity[] =
      await this.feedbackRepository.getAdminFeedbackListToday();
    return { list };
  }

  async getAdminFeedbackInfo(
    feedback: FeedbackEntity,
  ): Promise<FeedbackEntity> {
    const res = await this.feedbackRepository.getAdminFeedbackInfo(feedback);
    return res;
  }

  async updateAdminFeedbackStatus(
    feedback: FeedbackEntity,
    updateFeedbackStatusDto: UpdateFeedbackStatusDto,
  ): Promise<void> {
    feedback.status = updateFeedbackStatusDto.status;
    feedback.save();
  }
}
