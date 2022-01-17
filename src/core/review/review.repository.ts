import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { ReviewEntity } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewListItemDto } from './dto/get-review-list.dto';
import { CompanyEntity } from '../company/company.entity';

@EntityRepository(ReviewEntity)
export class ReviewRepository extends Repository<ReviewEntity> {
  async createReview(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const review: ReviewEntity = new ReviewEntity();
    const {
      company,
      revision,
      revisionCompany,
    }: CreateReviewDto = createReviewDto;

    review.company = company;

    if (revision) {
      review.revision = revision;
    }

    if (revisionCompany) {
      review.revisionCompany = revisionCompany;
    }

    try {
      await review.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return review;
  }

  async getReviewList(company: CompanyEntity): Promise<GetReviewListItemDto[]> {
    const query = this.createQueryBuilder('review');
    query.leftJoin('review.company', 'company');
    query.where('review.id = :id', { id: company.id });
    query.select(['review.id', 'company']);
    return query.getMany();
  }
}
