import { Post, Controller, Get, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetUser } from '../user/decorator/get-user.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserGuard } from '../user/guard/user.guard';
import { UserEntity } from '../user/user.entity';
import { CompanyMemberService } from './company-member.service';
import { CompanyMemberEntity } from './company-memeber.entity';
import { CompanyMemberRoles } from './decorator/company-member-role.decorator';
import { GetCompanyMember } from './decorator/get-company-member.decorator';
import { GetcompanyMemberListDto } from './dto/get-company-user-list.dto';
import { COMPANY_MEMBER_ROLE } from './enum/company-member-role.enum';
import { CompanyMemberGuard } from './guard/company-member.guard';

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

  @Post('/company/:companyId/member/user/:userId')
  @CompanyMemberRoles(COMPANY_MEMBER_ROLE.OWNER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    UserGuard,
    CompanyGuard,
    CompanyMemberGuard,
  )
  addcompanyMember(
    @GetCompany() company: CompanyEntity,
    @GetUser() user: UserEntity,
  ): Promise<void> {
    return this.companyMemberService.createCompanyMember(
      company,
      user,
      COMPANY_MEMBER_ROLE.MANAGER,
    );
  }

  @Delete('/company/:companyId/member/:companyMemberId')
  @CompanyMemberRoles(COMPANY_MEMBER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  deletecompanyMember(
    @GetCompanyMember() companyMember: CompanyMemberEntity,
  ): Promise<void> {
    return this.companyMemberService.deletecompanyMember(companyMember);
  }
}
