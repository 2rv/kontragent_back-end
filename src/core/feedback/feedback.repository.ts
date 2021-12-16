import {
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { FeedbackCreateDto } from './dto/create-feedback.dto';
import { UserEntity } from '../user/user.entity';
import { FeedbackEntity } from './feedback.entity';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  async createFeedback(
    feedbackCreateDto: FeedbackCreateDto,
    user: UserEntity,
  ): Promise<FeedbackEntity> {
    const { title, description } = feedbackCreateDto;

    const feedback: FeedbackEntity = new FeedbackEntity();

    feedback.title = title;
    feedback.description = description;

    feedback.user = user;

    await feedback.save();

    return feedback;
  }

  async getAdminFeedbackList(): Promise<FeedbackEntity[]> {
    const query = this.createQueryBuilder('feedback');

    query.select(['feedback.id', 'feedback.title', 'feedback.createDate']);
    return await query.getMany();
  }

  async getAdminFeedbackInfo(
    feedback: FeedbackEntity,
  ): Promise<FeedbackEntity> {
    const feedbackInfo = await this.createQueryBuilder('feedback')
      .leftJoin('feedback.files', 'files')
      .where('feedback.id = :id', { id: feedback.id })
      .select([
        'feedback.id',
        'feedback.title',
        'feedback.description',
        'feedback.createDate',
        'files',
      ])
      .getOne();

    return feedbackInfo;
  }
}
