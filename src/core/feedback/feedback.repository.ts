import { Repository, EntityRepository } from 'typeorm';
import { FeedbackCreateDto } from './dto/create-feedback.dto';
import { UserEntity } from '../user/user.entity';
import { FeedbackEntity } from './feedback.entity';
import { FEEDBACK_STATUS } from './enum/feedback-status.enum';

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

    query.select([
      'feedback.id',
      'feedback.title',
      'feedback.createDate',
      'feedback.status',
    ]);
    return await query.getMany();
  }

  async getAdminFeedbackListToday(): Promise<FeedbackEntity[]> {
    // const thisDay = new Intl.DateTimeFormat().format(new Date());
    const query = this.createQueryBuilder('feedback')
      .select([
        'feedback.id',
        'feedback.title',
        'feedback.createDate',
        'feedback.status',
      ])
      .where('feedback.status = :status', {
        status: FEEDBACK_STATUS.NEW,
      });
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
        'feedback.status',
        'files',
      ])
      .getOne();

    return feedbackInfo;
  }
}
