import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetKontragent } from '../kontragent/decorators/get-kontragent.decorator';
import { KontragentConsumerGuard } from '../kontragent/guard/kontragent-consumer.guard';
import { KontragentGuard } from '../kontragent/guard/kontragent.guard';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { AccountGuard } from '../user/guard/account.guard';
import { CompanyDataService } from './company-data.service';

@Controller('company-data')
export class CompanyDataController {
  constructor(private companyDataService: CompanyDataService) {}

  @Get('/get/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getInfo(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getInfo(company.inn);
  }

  @Get('/kontragent/info/:companyId/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  getKontragentInfo(@GetKontragent() kontragent: KontragentEntity) {
    return this.companyDataService.getKontragentInfo(kontragent);
  }

  @Get('/egr-details/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getEgrDetails(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getEgrDetails(company.inn);
  }

  //Это пдф выписка можно по кнопке её получать
  @Get('/excerpt/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  async getExcerpt(@GetCompany() company: CompanyEntity, @Res() res) {
    const stream = await this.companyDataService.getExcerpt(company.inn);
    stream.pipe(res);
  }

  //Это экспресс аналитика пдф
  @Get('/brief-report-pdf/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  async getBriefReportPdf(@GetCompany() company: CompanyEntity, @Res() res) {
    const stream = await this.companyDataService.getBriefReportPdf(company.inn);
    stream.pipe(res);
  }

  @Get('/analytics/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAnalytics(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getAnalytics(company.inn);
  }

  // Для юр лиц
  @Get('/foreign-representatives/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getForeignRepresentatives(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getForeignRepresentatives(company.inn);
  }

  // Для юр лиц
  @Get('/moratorium-bankruptcy/covid19/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getMoratoriumOnBankruptcyCovid19(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getMoratoriumOnBankruptcyCovid19(
      company.inn,
    );
  }

  // Для юр лиц
  @Get('/buh/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getBuh(@GetCompany() company: CompanyEntity) {
    return this.companyDataService.getBuh(company.inn);
  }

  @Get('/taxes/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getTaxes(@Param('inn') inn: string) {
    return this.companyDataService.getTaxes(inn);
  }

  @Get('/person-bankruptcy')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getPersonBankruptcy(
    @Query('innfl') innfl: string,
    @Query('fio') fio: string,
    @Query('birthDate') birthDate: string,
  ) {
    return this.companyDataService.getPersonBankruptcy({
      innfl: innfl,
      fio: fio,
      birthDate: birthDate,
    });
  }

  @Get('/petitioners-arbitration/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getPetitionersOfArbitration(
    @Param('inn') inn: string,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    return this.companyDataService.getPetitionersOfArbitration({
      inn: inn,
      skip: skip,
      limit: limit,
    });
  }

  @Get('/fssp/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getFssp(@Param('inn') inn: string, @Query('skip') skip: number) {
    return this.companyDataService.getFssp({
      inn: inn,
      skip: skip,
    });
  }

  @Get('/purchases-customer/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getPurchasesOfCustomer(
    @Param('inn') inn: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.companyDataService.getPurchasesOfCustomer({
      inn: inn,
      skip: skip,
      take: take,
    });
  }

  @Get('/purchases-participant/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getPurchasesOfParticipant(
    @Param('inn') inn: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.companyDataService.getPurchasesOfParticipant({
      inn: inn,
      skip: skip,
      take: take,
    });
  }

  @Get('/bank-guarantees/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getBankGuarantees(@Param('inn') inn: string, @Query('skip') skip: number) {
    return this.companyDataService.getBankGuarantees({
      inn: inn,
      skip: skip,
    });
  }

  @Get('/lessee/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getLessee(
    @Param('inn') inn: string,
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ) {
    return this.companyDataService.getLessee({
      inn: inn,
      skip: skip,
      limit: limit,
    });
  }

  @Get('/fts-debtors/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getFtsDebtors(@Param('inn') inn: string) {
    return this.companyDataService.getFtsDebtors(inn);
  }

  @Get('/pledger/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getPledger(@Param('inn') inn: string) {
    return this.companyDataService.getPledger(inn);
  }

  @Get('/inspections/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getInspections(
    @Param('inn') inn: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.companyDataService.getInspections({
      inn: inn,
      skip: skip,
      take: take,
    });
  }

  @Get('/sites/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getSites(@Param('inn') inn: string) {
    return this.companyDataService.getSites(inn);
  }

  @Get('/check-passport/:inn')
  //   @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  checkPassport(@Param('inn') inn: string) {
    return this.companyDataService.checkPassport(inn);
  }
}
