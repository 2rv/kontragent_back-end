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
import { CompanyUserRoles } from '../company-user/decorator/company-user-role.decorator';
import { COMPANY_USER_ROLE } from '../company-user/enum/company-user-role.enum';
import { CompanyUserGuard } from '../company-user/guard/company-user.guard';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), AccountGuard)
  createCompany(
    @Body(ValidationPipe) companyCreateDto: CompanyCreateDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.companyService.createCompany(companyCreateDto, user);
  }

  @Get('/get/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getCompany(@GetCompany() company: CompanyEntity): Promise<AccountGetInfoDto> {
    return this.companyService.getCompany(company);
  }

  @Patch('/:companyId')
  @CompanyUserRoles(COMPANY_USER_ROLE.OWNER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyUserGuard)
  updateCompanyInfo(
    @Body(ValidationPipe) companyUpdateDto: CompanyUpdateDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.companyService.updateCompanyInfo(company, companyUpdateDto);
  }

  @Get('/account/company-list')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountCompanyList(@GetAccount() user: UserEntity) {
    return this.companyService.getAccountCompanyList(user);
  }
}
