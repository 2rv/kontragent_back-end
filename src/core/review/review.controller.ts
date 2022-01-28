import { Body, Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AccountGuard } from '../user/guard/account.guard';
import { GetReview } from './decorators/get-review.decorator';
import { GetReviewListDto } from './dto/get-review-list.dto';
import { GetRevisionDataDto } from './dto/get-revision-data.dto';
import { ReviewGuard } from './guard/review.guard';
import { ReviewEntity } from './review.entity';

import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  // @Get('/get/:reviewId')
  // // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard(), AccountGuard, ReviewGuard)
  // getReview(@GetReview() review: ReviewEntity): Promise<GetRevisionDataDto> {
  //   console.log(review);

  //   return this.reviewService.getReview(review);
  // }

  @Get('/get/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getReviewList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetReviewListDto> {
    return this.reviewService.getReviewList(company);
  }
}
