import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserVerificationService } from './user-verification.service';
import { ReferalGuard } from '../referal/guard/referal.guard';
import { GetReferal } from '../referal/decorator/get-referal.decorator';
import { ReferalEntity } from '../referal/referal.entity';

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

  @Post('/phone/:code/referal/:referalId')
  @UseGuards(AuthGuard(), AccountGuard, ReferalGuard)
  confirmPhoneVerificationWithReferal(
    @Param('code') code: string,
    @GetReferal() referal: ReferalEntity,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userVerificationService.confirmUserVerificationPhoneWithReferal(
      code,
      referal,
      user,
    );
  }
}
