import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  ValidationPipe,
  Query,
  Param,
  DefaultValuePipe,
  ParseBoolPipe,
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
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { GetCompanyInfoDto } from './dto/get-company-info.dto';
import {
  GetCompanyAdminListDto,
  GetCompanyListDto,
} from './dto/get-company-list.dto';

import { CompanyService } from './company.service';

import { UserGuard } from '../user/guard/user.guard';
import { GetUser } from '../user/decorator/get-user.decorator';
import { ImportCompaniesDto } from './dto/import-companies.dto';
import { COMPANY_TYPE } from './enum/company-type.enum';
import { SkipValidationPipe } from 'src/common/pipe/skip-validation.pipe';
import { TakeValidationPipe } from 'src/common/pipe/take-validation.pipe';
import { EnumValidationPipe } from 'src/common/pipe/enum-validation.pipe';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard)
  createCompany(
    @Body(ValidationPipe) companyCreateDto: CreateCompanyDto,
    @GetAccount() user: UserEntity,
  ): Promise<CreateCompanyInfoDto> {
    return this.companyService.createCompany(companyCreateDto, user);
  }

  @Get('/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountCompanyList(@GetAccount() user: UserEntity) {
    return this.companyService.getCompanyUserList(user);
  }

  @Get('/get/:companyId')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getCompany(@GetCompany() company: CompanyEntity): Promise<GetCompanyInfoDto> {
    return this.companyService.getCompanyInfo(company);
  }

  @Post('/admin/import')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  importCompanies(
    @Body(ValidationPipe)
    companies: ImportCompaniesDto,
  ): Promise<void> {
    return this.companyService.importCompanies(companies);
  }

  @Get('/admin/user/:userId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, UserGuard)
  getAdminUserCompanyList(
    @GetUser() user: UserEntity,
  ): Promise<GetCompanyListDto> {
    return this.companyService.getCompanyUserList(user);
  }

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminCompanyList(
    @Query(
      'type',
      new DefaultValuePipe(0),
      new EnumValidationPipe(COMPANY_TYPE),
    )
    type: COMPANY_TYPE,
    @Query('skip', new DefaultValuePipe(0), SkipValidationPipe) skip: number,
    @Query('take', new DefaultValuePipe(25), TakeValidationPipe) take: number,
    @Query('registered', new DefaultValuePipe(true), ParseBoolPipe)
    registered: boolean,
  ): Promise<GetCompanyAdminListDto> {
    return this.companyService.getCompanyAdminList({
      skip,
      take,
      type,
      registered,
    });
  }

  @Patch('/admin/verificateInfo/:companyId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  verifyCompanyInfo(@GetCompany() company: CompanyEntity): Promise<void> {
    return this.companyService.verifyCompanyInfo(company);
  }
}
