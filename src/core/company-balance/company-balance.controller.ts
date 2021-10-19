import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { CompanyGuard } from '../company/guard/company.guard';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyBalanceEntity } from './company-balance.entity';
import { CompanyBalanceService } from './company-balance.service';
import { GetCompanyBalance } from './decorator/get-company-balance.decorator';
import { GetCompanyBalanceInfoDto } from './dto/get-company-balance-info.dto';
import { CompanyBalanceGuard } from './guard/company-balance.guard';

@Controller('company')
export class CompanyBalanceController {
  constructor(private companyBalanceService: CompanyBalanceService) {}

  @Get('/:companyId/balance')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    CompanyBalanceGuard,
  )
  async getCompanyBalance(
    @GetCompanyBalance() companyBalance: CompanyBalanceEntity,
  ): Promise<GetCompanyBalanceInfoDto> {
    return this.companyBalanceService.getCompanyBalanceInfo(companyBalance);
  }
}
