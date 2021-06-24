import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyUserService } from './company-user.service';
import { CompanyUserRoles } from './decorator/company-user-role.decorator';
import { COMPANY_USER_ROLE } from './enum/company-user-role.enum';
import { CompanyUserGuard } from './guard/company.guard';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('company-user')
export class CompanyUserController {
  constructor(private companyUserService: CompanyUserService) {}

  @Get('/company/:companyId/user/list')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyUserGuard)
  getCompanyUserList(
    @GetCompany() company: CompanyEntity,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.companyUserService.getCompanyUserList(company, user);
  }
}
