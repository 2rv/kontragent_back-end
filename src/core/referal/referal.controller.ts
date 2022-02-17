import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { ReferalService } from './referal.service';
import { ReferalEntity } from './referal.entity';

@Controller('referal')
export class ReferalController {
  constructor(private referalService: ReferalService) {}
  @Get('/')
  @UseGuards(AuthGuard(), AccountGuard)
  getReferalInfo(@GetAccount() user: UserEntity): Promise<ReferalEntity> {
    return this.referalService.getUserReferalInfoByUser(user);
  }

  @Get('/balance')
  @UseGuards(AuthGuard(), AccountGuard)
  getReferalBalance(@GetAccount() user: UserEntity): Promise<ReferalEntity> {
    return this.referalService.getReferalBalance(user);
  }
}
