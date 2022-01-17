import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewShortDto } from './dto/get-review-short.dto';
import { GetRevisionDataDto } from './dto/get-revision-data.dto';
import { ReviewEntity } from './review.entity';
import { GetReviewListDto, GetReviewListItemDto } from './dto/get-review-list.dto';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<GetReviewShortDto> {
    const review = await this.reviewRepository.createReview(createReviewDto);

    return { id: review.id };
  }

  async getReview(review: ReviewEntity): Promise<GetRevisionDataDto> {
    return review;
  };

  async getReviewList(company: CompanyEntity): Promise<GetReviewListDto> {
    const list: GetReviewListItemDto[] = await this.reviewRepository.getReviewList(company);
    return { list };
  };
}
