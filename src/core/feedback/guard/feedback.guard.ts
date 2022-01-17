import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FeedbackRepository } from '../feedback.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackGuard implements CanActivate {
  constructor(
    @InjectRepository(FeedbackRepository)
    private feedbackRepository: FeedbackRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (isNaN(params.feedbackId)) {
      throw new BadRequestException();
    }

    const feedback = await this.feedbackRepository.findOne({
      where: { id: Number(params.feedbackId) },
    });

    if (!feedback) {
      throw new NotFoundException();
    }

    request.feedback = feedback;

    return true;
  }
}
