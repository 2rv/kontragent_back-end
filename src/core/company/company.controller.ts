import {
  Controller,
  UseGuards,
  Post,
  Get,
  Patch,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { CompanyService } from './company.service';
import { GetCompany } from './decorator/get-company.decorator';
import { CompanyEntity } from './company.entity';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { CompanyGuard } from './guard/company.guard';
import { AccountGetInfoDto } from './dto/account-get-info.dto';
import { CompanyUserGuard } from '../company-user/guard/company.guard';
import { CompanyUserCreateDto } from '../company-user/dto/company-user-create.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), AccountGuard)
  createCompany(
    @Body(ValidationPipe) companyCreateDto: CompanyCreateDto,
    @GetAccount() user: UserEntity,
    @Body(ValidationPipe) companyUserCreateDto: CompanyUserCreateDto,
  ): Promise<void> {
    return this.companyService.createCompany(
      companyCreateDto,
      user,
      companyUserCreateDto,
    );
  }

  @Get('/get/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getCompany(@GetCompany() company: CompanyEntity): Promise<AccountGetInfoDto> {
    return this.companyService.getCompany(company);
  }

  @Patch('/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  updateCompanyInfo(
    @Body(ValidationPipe) companyUpdateDto: CompanyUpdateDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.companyService.updateCompanyInfo(company, companyUpdateDto);
  }

  @Get('/account/company-list')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountCompanyList() {}
}
