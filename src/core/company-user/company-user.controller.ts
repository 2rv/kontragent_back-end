import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  ValidationPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyUserService } from './company-user.service';
import { CompanyUserRoles } from './decorator/company-user-role.decorator';
import { COMPANY_USER_ROLE } from './enum/company-user-role.enum';
import { CompanyUserGuard } from './guard/company-user.guard';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { CompanyUserGetUserListDto } from './dto/get-company-user-list.dto';
import { CompanyUserCreateDto } from './dto/company-user-create.dto';
import { RequestedCompanyUserGuard } from './guard/requested-company-user.guard';
import { GetCompanyUser } from './decorator/get-company-user.decorator';
import { CompanyUserEntity } from './company-user.entity';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Controller('company-user')
export class CompanyUserController {
  constructor(private companyUserService: CompanyUserService) {}

  @Get('/company/:companyId/user/list')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyUserGuard)
  getCompanyUserList(
    @GetCompany() company: CompanyEntity,
  ): Promise<CompanyUserGetUserListDto[]> {
    return this.companyUserService.getCompanyUserList(company);
  }

  @Post('/:companyId/user')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyUserGuard)
  addCompanyUser(
    @GetCompany() company: CompanyEntity,
    @Body(ValidationPipe) companyUserCreateDto: CompanyUserCreateDto,
  ): Promise<void> {
    return this.companyUserService.addCompanyUser(
      company,
      companyUserCreateDto,
    );
  }

  @Delete('/company/:companyId/user/:companyUserId')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyUserGuard,
    RequestedCompanyUserGuard,
  )
  deleteCompanyUser(
    @GetCompanyUser() companyUser: CompanyUserEntity,
  ): Promise<void> {
    return this.companyUserService.deleteCompanyUser(companyUser);
  }

  @Patch('/company/:companyId/user/:companyUserId')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyUserGuard,
    RequestedCompanyUserGuard,
  )
  updateCompanyUser(
    @GetCompanyUser() companyUser: CompanyUserEntity,
    @Body(ValidationPipe) updateCompanyUserDto: UpdateCompanyUserDto,
  ): Promise<void> {
    return this.companyUserService.updateCompanyUser(
      companyUser,
      updateCompanyUserDto,
    );
  }
}
