import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UpdateReferalBalanceDto } from './dto/update-referal-balance.dto';
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

  @Post('/update-balance')
  @UseGuards(AuthGuard(), AccountGuard)
  updateReferalBalance(
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) updateReferalBalanceDto: UpdateReferalBalanceDto,
  ): Promise<any> {
    return this.referalService.subtractUserReferalBalanceByUser(
      updateReferalBalanceDto,
      user,
    );
  }
}
