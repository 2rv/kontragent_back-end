import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserVerificationService } from './user-verification.service';
import { ReferrerGuard } from '../referrer/guard/referrer.guard';
import { GetReferrer } from '../referrer/decorator/get-referrer.decorator';
import { ReferrerEntity } from '../referrer/referrer.entity';

@Controller('user-verification')
export class UserVerificationController {
  constructor(private userVerificationService: UserVerificationService) {}

  @Get('/email')
  @UseGuards(AuthGuard(), AccountGuard)
  getEmailCode(@GetAccount() user: UserEntity): Promise<void> {
    return this.userVerificationService.getEmailVerificationCode(user);
  }

  @Post('/email/:code')
  @UseGuards(AuthGuard(), AccountGuard)
  confirmEmailVerification(@Param('code') code: string): Promise<void> {
    return this.userVerificationService.confirmUserVerificationEmail(code);
  }

  @Get('/phone')
  @UseGuards(AuthGuard(), AccountGuard)
  getPhoneCode(@GetAccount() user: UserEntity): Promise<void> {
    return this.userVerificationService.getPhoneVerificationCode(user);
  }

  @Post('/phone/:code')
  @UseGuards(AuthGuard(), AccountGuard)
  confirmPhoneVerification(@Param('code') code: string): Promise<void> {
    return this.userVerificationService.confirmUserVerificationPhone(code);
  }

  @Post('/phone/:code/referrer/:referrerId')
  @UseGuards(AuthGuard(), AccountGuard, ReferrerGuard)
  confirmPhoneVerificationWithReferrer(
    @Param('code') code: string,
    @GetReferrer() referrer: ReferrerEntity,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userVerificationService.confirmUserVerificationPhoneWithReferrer(
      code,
      referrer,
      user,
    );
  }
}
