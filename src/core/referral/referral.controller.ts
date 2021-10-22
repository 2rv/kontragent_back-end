import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { ReferralService } from './referral.service';
import { SendReferralLinkDto } from './dto/send-referral-link.dto';
import { ReferrerGuard } from '../referrer/guard/referrer.guard';
import { GetReferrer } from '../referrer/decorator/get-referrer.decorator';
import { ReferrerEntity } from '../referrer/referrer.entity';
import { ReferralEntity } from './referral.entity';

@Controller('referral')
export class ReferralController {
  constructor(private referralService: ReferralService) {}

  @Post('/link')
  @UseGuards(AuthGuard(), AccountGuard)
  sendReferralLink(
    @Body(ValidationPipe) sendReferralLinkDto: SendReferralLinkDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.referralService.sendReferralLink(user, sendReferralLinkDto);
  }

  @Post('/create/:referrerId')
  @UseGuards(AuthGuard(), AccountGuard, ReferrerGuard)
  confirmPhoneVerificationWithReferrer(
    @GetReferrer() referrer: ReferrerEntity,
    @GetAccount() user: UserEntity,
  ): Promise<ReferralEntity> {
    return this.referralService.createReferral(referrer, user);
  }
}
