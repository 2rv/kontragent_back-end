import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyGuard } from './guard/company.guard';

import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from './company.entity';

import { GetCompany } from './decorator/get-company.decorator';
import { GetAccount } from '../user/decorator/get-account.decorator';

import { CreateCompanyDto } from './dto/create-company.dto';
import { GetCompanyInfoDto } from './dto/get-company-info.dto';
import { GetAdminCompanyListDto } from './dto/get-admin-company-list.dto';

import { CompanyService } from './company.service';
import { GetAccountCompanyListDto } from './dto/get-account-company-list.dto';

import { UserGuard } from '../user/guard/user.guard';
import { GetUser } from '../user/decorator/get-user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AccountGuard)
  createCompany(
    @Body(ValidationPipe) companyCreateDto: CreateCompanyDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.companyService.createCompany(companyCreateDto, user);
  }

  @Get('/get/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getCompany(@GetCompany() company: CompanyEntity): Promise<GetCompanyInfoDto> {
    return this.companyService.getCompanyInfo(company);
  }

  @Get('/account')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountCompanyList(@GetAccount() user: UserEntity) {
    return this.companyService.getAccountCompanyList(user);
  }

  @Get('/admin/:userId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, UserGuard)
  getAdminUserCompanyList(
    @GetUser() user: UserEntity,
  ): Promise<GetAccountCompanyListDto> {
    return this.companyService.getAccountCompanyList(user);
  }

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminCompanyList(): Promise<GetAdminCompanyListDto> {
    return this.companyService.getAdminCompanyList();
  }

  @Patch('/admin/verificateInfo/:companyId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  verifyCompanyInfo(@GetCompany() company: CompanyEntity): Promise<void> {
    return this.companyService.verifyCompanyInfo(company);
  }
}
