import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../company/company.repository';
import { KontragentRepository } from '../kontragent/kontragent.repository';
import { RevisionRepository } from '../revision/revision.repository';
import { GetAnalyticsData } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
  ) {}

  async getAnalytics(): Promise<GetAnalyticsData> {
    const revision = await this.revisionRepository.getRevisionCount();
    const kontragent = await this.kontragentRepository.getKontragentCount();
    const company = await this.companyRepository.getCompanyCount();

    return {
      revision: revision * 15,
      kontragent: kontragent * 3,
      company: company * 2,
    };
  }
}
