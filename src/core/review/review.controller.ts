import { Body, Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetKontragent } from '../kontragent/decorators/get-kontragent.decorator';
import { KontragentConsumerGuard } from '../kontragent/guard/kontragent-consumer.guard';
import { KontragentGuard } from '../kontragent/guard/kontragent.guard';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { AccountGuard } from '../user/guard/account.guard';
import { GetReviewListDto } from './dto/get-review-list.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  // @Get('/get/:reviewId')
  // @Roles(USER_ROLE.ADMIN)
  // @UseGuards(AuthGuard(), AccountGuard, ReviewGuard)
  // getReview(@GetReview() review: ReviewEntity): Promise<GetRevisionDataDto> {
  //   return this.reviewService.getReview(review);
  // }

  @Get('get/:companyId/kontragent/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  getReviewList(
    @GetKontragent() kontragent: KontragentEntity,
  ): Promise<GetReviewListDto> {
    return this.reviewService.getReviewList(kontragent);
  }
}
