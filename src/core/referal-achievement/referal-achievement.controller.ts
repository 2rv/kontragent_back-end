import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReferalAchievementService } from './referal-achievement.service';
import { ReferalAchievementEntity } from './referal-achievement.entity';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('referal-achievement')
export class ReferalAchievementController {
  constructor(private referalAchievementService: ReferalAchievementService) {}
  @Get('/')
  @UseGuards(AuthGuard(), AccountGuard)
  getReferalAchievementList(
    @GetAccount() user: UserEntity,
  ): Promise<ReferalAchievementEntity[]> {
    return this.referalAchievementService.getReferalAchievementListByUser(user);
  }
}
