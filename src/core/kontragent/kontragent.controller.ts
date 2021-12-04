import { Body, Controller, Get, Post, UseGuards, Delete } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';

import { KontragentService } from './kontragent.service';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { KontragentGuard } from './guard/kontragent.guard';
import { KontragentConsumerGuard } from './guard/kontragent-consumer.guard';
import { CompanyGuard } from '../company/guard/company.guard';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { KontragentEntity } from './kontragent.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { GetKontragent } from './decorators/get-kontragent.decorator';
import { GetKontragentInfoDto } from './dto/get-kontragent-info.dto';

@Controller('kontragent')
export class KontragentController {
  constructor(private kontragentService: KontragentService) {}

  @Post('company/:companyId/create/kontragent')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  create(
    @Body() createKontragentDto: CreateKontragentDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<KontragentEntity> {
    return this.kontragentService.createKontragent(
      company,
      createKontragentDto,
    );
  }

  @Get('/get/company/:companyId/kontragents')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getAllCompanyKontragents(
    @GetCompany() company: CompanyEntity,
  ): Promise<KontragentEntity[]> {
    return this.kontragentService.getAllCompanyKontragents(company);
  }

  @Get('/getone/company/:companyId/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  getOneKontragent(
    @GetKontragent() kontragent: KontragentEntity,
  ): Promise<GetKontragentInfoDto> {
    return this.kontragentService.getOneKontragent(kontragent);
  }

  @Delete('/delete/company/:companyId/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  deleteKontragent(@GetKontragent() kontragent: KontragentEntity) {
    return this.kontragentService.deleteKontragent(kontragent);
  }
}
