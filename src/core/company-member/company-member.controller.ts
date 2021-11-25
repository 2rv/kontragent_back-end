import {
  Post,
  Controller,
  Get,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { CompanyMemberParametrGuard } from './guard/company-member-parametr.guard';
import { CompanyMemberGuard } from './guard/company-member.guard';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyMemberService } from './company-member.service';
import { CompanyMemberEntity } from './company-memeber.entity';
import { CompanyMemberRoles } from './decorator/company-member-role.decorator';
import { GetParamCompanyMember } from './decorator/company-member-parametr.decorator';
import { GetcompanyMemberListDto } from './dto/get-company-user-list.dto';
import { COMPANY_MEMBER_ROLE } from './enum/company-member-role.enum';

import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Controller('company-member')
export class CompanyMemberController {
  constructor(private companyMemberService: CompanyMemberService) {}

  @Get('/company/:companyId/member/list')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getcompanyMemberList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetcompanyMemberListDto> {
    return this.companyMemberService.getcompanyMemberList(company);
  }

  @Get('/admin/company/:companyId/member/list')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAdminCompanyMemberList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetcompanyMemberListDto> {
    return this.companyMemberService.getcompanyMemberList(company);
  }

  @Post('/company/:companyId/member/user/:credential')
  @CompanyMemberRoles(COMPANY_MEMBER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  addCompanyMember(
    @GetCompany() company: CompanyEntity,
    @Param('credential') credential: string,
  ): Promise<void> {
    return this.companyMemberService.createCompanyMember(
      company,
      credential,
      COMPANY_MEMBER_ROLE.MANAGER,
    );
  }

  @Delete('/company/:companyId/member/:companyMemberId')
  @CompanyMemberRoles(COMPANY_MEMBER_ROLE.OWNER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    CompanyMemberParametrGuard,
  )
  deletecompanyMember(
    @GetParamCompanyMember() companyMember: CompanyMemberEntity,
  ): Promise<void> {
    return this.companyMemberService.deleteCompanyMember(companyMember);
  }
}
