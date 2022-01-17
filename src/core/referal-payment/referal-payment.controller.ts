import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReferalPaymentService } from './referal-payment.service';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('referal-payment')
export class ReferalPaymentController {
  constructor(private referalPaymentService: ReferalPaymentService) {}
  @Get('/')
  @UseGuards(AuthGuard(), AccountGuard)
  getReferalPaymentsList(
    @GetAccount() user: UserEntity,
  ): Promise<ReferalPaymentEntity[]> {
    return this.referalPaymentService.getReferalPaymentListByUser(user);
  }
}
