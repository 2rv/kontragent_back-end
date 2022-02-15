import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  ValidationPipe,
  Patch,
} from '@nestjs/common';

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
import { USER_ROLE } from '../user/enum/user-role.enum';
import { Roles } from '../user/decorator/role.decorator';
import { ImportKontragentsDto } from './dto/import-kontragents.dto';
import { UpdateKontragentInfoDto } from './dto/update-kontragent-info.dto';

@Controller('kontragent')
export class KontragentController {
  constructor(private kontragentService: KontragentService) {}

  @Post('company/:companyId/create/kontragent')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  create(
    @Body(ValidationPipe) createKontragentDto: CreateKontragentDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<KontragentEntity> {
    return this.kontragentService.createKontragent(
      company,
      createKontragentDto,
    );
  }

  @Post('/import/:companyId')
  @Roles(USER_ROLE.ADMIN, USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  importCompanies(
    @GetCompany() company: CompanyEntity,
    @Body(ValidationPipe)
    kontragentsData: ImportKontragentsDto,
  ): Promise<void> {
    return this.kontragentService.importKontragents(company, kontragentsData);
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

  @Patch('/info/:companyId/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  updateKontragentInfo(
    @GetKontragent() kontragent: KontragentEntity,
    @Body(ValidationPipe) updateKontragentInfoDto: UpdateKontragentInfoDto,
  ) {
    return this.kontragentService.updateKonragentInfo(
      kontragent,
      updateKontragentInfoDto,
    );
  }
}
