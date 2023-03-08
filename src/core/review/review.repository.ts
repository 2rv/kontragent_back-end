import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewListItemDto } from './dto/get-review-list.dto';
import { CompanyEntity } from '../company/company.entity';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {
  async createReview(reviewData: CreateReviewDto): Promise<ReviewEntity> {
    try {
      return await this.save(reviewData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getReviewList(company: CompanyEntity): Promise<GetReviewListItemDto[]> {
    const query = this.createQueryBuilder('review');
    // query.leftJoin('review.company', 'company');
    // query.leftJoinAndSelect('review.fileReview', 'fileReview');
    // query.where('company.id = :id', { id: company.id });
    // query.select(['review.id', 'company', 'review.review']);
    return query.getMany();
  }
}
