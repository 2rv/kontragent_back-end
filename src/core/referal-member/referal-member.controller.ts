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
import { ReferalMemberService } from './referal-member.service';
import { SendReferalMemberLinkDto } from './dto/send-referal-member-link.dto';
import { ReferalGuard } from '../referal/guard/referal.guard';
import { GetReferal } from '../referal/decorator/get-referal.decorator';
import { ReferalEntity } from '../referal/referal.entity';
import { ReferalMemberEntity } from './referal-member.entity';

@Controller('referal')
export class ReferalMemberController {
  constructor(private referalMemberService: ReferalMemberService) {}

  @Post('/link')
  @UseGuards(AuthGuard(), AccountGuard)
  sendReferralLink(
    @Body(ValidationPipe) sendReferalMemberLinkDto: SendReferalMemberLinkDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.referalMemberService.sendReferalMemberLink(
      user,
      sendReferalMemberLinkDto,
    );
  }

  @Post('/create/:referalId')
  @UseGuards(AuthGuard(), AccountGuard, ReferalGuard)
  confirmPhoneVerificationWithReferrer(
    @GetReferal() referal: ReferalEntity,
    @GetAccount() user: UserEntity,
  ): Promise<ReferalMemberEntity> {
    return this.referalMemberService.createReferalMember(referal, user);
  }
}
