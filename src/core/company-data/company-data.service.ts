import { Readable } from 'stream';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDataRepository } from './company-data.repository';
import { CompanyDataEntity } from './company-data.entity';
import { CompanyDataDto } from './dto/company-data.dto';
import { getReq } from './actions/get-info';
import { getExcerpt } from './actions/get-excerpt';
import { getEgrDetails } from './actions/get-egr-details';
import { getAnalytics } from './actions/get-analytics';
import { getForeignRepresentatives } from './actions/get-foreign-representatives';
import { getMoratoriumOnBankruptcyCovid19 } from './actions/get-moratorium-on-bankruptcy-covid19';
import { getBuh } from './actions/get-buh';
import { getTaxes } from './actions/get-taxes';
import {
  getPersonBankruptcy,
  personBankruptcyQuery,
} from './actions/get-person-bankruptcy';
import {
  getPetitionersOfArbitration,
  petitionersOfArbitrationQuery,
} from './actions/get-petitioners-of-arbitration';
import { getFssp, fsspQuery } from './actions/get-fssp';
import {
  getPurchasesOfCustomer,
  purchasesOfCustomerQuery,
} from './actions/get-purchases-of-customer';
import {
  getPurchasesOfParticipant,
  purchasesOfParticipantQuery,
} from './actions/get-purchases-of-participant';
import {
  bankGuaranteesQuery,
  getBankGuarantees,
} from './actions/get-bank-guarantees';
import { getLessee, lesseeQuery } from './actions/get-lessee';
import { getInspections, inspectionsQuery } from './actions/get-inspections';
import { getFtsDebtors } from './actions/get-fts-debtors';
import { getPledger } from './actions/get-pledger';
import { getSites } from './actions/get-sites';
import { checkPassport } from './actions/get-check-passport';
import { KontragentRepository } from '../kontragent/kontragent.repository';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { getBriefReportPdf } from './actions/get-brief-report-pdf';

@Injectable()
export class CompanyDataService {
  constructor(
    @InjectRepository(CompanyDataRepository)
    private companyRepository: CompanyDataRepository,
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
  ) {}

  async getInfo(inn: string): Promise<any> {
    const req = await this.getReq(inn);
    const egrDetails = await this.getEgrDetails(inn);
    return {
      req: req[0],
      egrDetails: egrDetails[0],
    };
  }

  async getKontragentInfo(kontragent: KontragentEntity): Promise<any> {
    const info = await this.kontragentRepository.getKontragent(kontragent);

    if (!info) throw new BadRequestException('Контрагент не найден');
    return this.getInfo(info.contractor.inn);
  }

  async getReq(inn: string): Promise<any> {
    return await getReq(inn);
  }

  async getEgrDetails(inn: string): Promise<any> {
    return await getEgrDetails(inn);
  }

  async getExcerpt(inn: string): Promise<Readable> {
    return await getExcerpt(inn);
  }

  async getBriefReportPdf(inn: string): Promise<Readable> {
    return await getBriefReportPdf(inn);
  }

  async getAnalytics(inn: string): Promise<any> {
    return await getAnalytics(inn);
  }

  async getForeignRepresentatives(inn: string): Promise<any> {
    return await getForeignRepresentatives(inn);
  }

  async getMoratoriumOnBankruptcyCovid19(inn: string): Promise<any> {
    return await getMoratoriumOnBankruptcyCovid19(inn);
  }

  async getBuh(inn: string): Promise<any> {
    return await getBuh(inn);
  }

  async getTaxes(inn: string): Promise<any> {
    return await getTaxes(inn);
  }

  async getPersonBankruptcy(query: personBankruptcyQuery): Promise<any> {
    return await getPersonBankruptcy(query);
  }

  async getPetitionersOfArbitration(
    query: petitionersOfArbitrationQuery,
  ): Promise<any> {
    return await getPetitionersOfArbitration(query);
  }

  async getFssp(query: fsspQuery): Promise<any> {
    return await getFssp(query);
  }

  async getPurchasesOfCustomer(query: purchasesOfCustomerQuery): Promise<any> {
    return await getPurchasesOfCustomer(query);
  }

  async getPurchasesOfParticipant(
    query: purchasesOfParticipantQuery,
  ): Promise<any> {
    return await getPurchasesOfParticipant(query);
  }

  async getBankGuarantees(query: bankGuaranteesQuery): Promise<any> {
    return await getBankGuarantees(query);
  }

  async getLessee(query: lesseeQuery) {
    return await getLessee(query);
  }

  async getFtsDebtors(inn: string): Promise<any> {
    return await getFtsDebtors(inn);
  }

  async getPledger(inn: string): Promise<any> {
    return await getPledger(inn);
  }

  async getInspections(query: inspectionsQuery): Promise<any> {
    return await getInspections(query);
  }

  async getSites(inn: string): Promise<any> {
    return await getSites(inn);
  }

  async checkPassport(passportNumber: string): Promise<any> {
    return await checkPassport(passportNumber);
  }
}
