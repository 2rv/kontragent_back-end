import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from '../review.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { REVIEW_ERROR } from '../enum/review-error.enum';

@Injectable()
export class ReviewGuard implements CanActivate {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params }: { params: any } = request;

    if (isNaN(params.reviewId)) {
      throw new BadRequestException();
    }

    const review = await this.reviewRepository.findOne({
      where: { id: params.reviewId },
      relations: ['consumer']
    });

    if (!review) {
      throw new NotFoundException(REVIEW_ERROR.CANNOT_FIND_REVIEW);
    }

    request.review = review;

    return true;
  }
}
