import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserVerificationService } from './user-virifiaction.service';

@Controller('user/verification')
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
}
