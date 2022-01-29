import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetRevisionDataDto } from './dto/get-revision-data.dto';
import { ReviewEntity } from './review.entity';
import {
  GetReviewListDto,
  GetReviewListItemDto,
} from './dto/get-review-list.dto';
import { CompanyEntity } from '../company/company.entity';
import { KontragentEntity } from '../kontragent/kontragent.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    return await this.reviewRepository.createReview(createReviewDto);
  }

  async getReview(review: ReviewEntity): Promise<GetRevisionDataDto> {
    return review;
  }

  async getReviewList(kontragent: KontragentEntity): Promise<GetReviewListDto> {
    console.log(kontragent);
    const list = await this.reviewRepository.getReviewList(
      kontragent.contractor,
    );
    console.log(list);
    return { list };
  }
}
