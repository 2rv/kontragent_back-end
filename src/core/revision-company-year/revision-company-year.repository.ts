import { BadRequestException } from '@nestjs/common';
import { RevisionCompanyYearEntity } from './revision-company-year.entity';
import { EntityRepository, Repository } from 'typeorm';

import { CreateRevisionYearDto } from './dto/create-revision-company-year.dto';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';

@EntityRepository(RevisionCompanyYearEntity)
export class RevisionCompanyYearRepository extends Repository<RevisionCompanyYearEntity> {
  async createRevisionCompanyYears(
    createRevisionCompanyDto: CreateRevisionYearDto,
    revisionCompanyEntity: RevisionCompanyEntity,
  ): Promise<RevisionCompanyYearEntity> {
    const revisionCompanyYear: RevisionCompanyYearEntity =
      new RevisionCompanyYearEntity();

    revisionCompanyYear.year = createRevisionCompanyDto.year;
    revisionCompanyYear.firstPeriod = createRevisionCompanyDto.firstPeriod;
    revisionCompanyYear.secondPeriod = createRevisionCompanyDto.secondPeriod;
    revisionCompanyYear.thirdPeriod = createRevisionCompanyDto.thirdPeriod;
    revisionCompanyYear.fourthPeriod = createRevisionCompanyDto.fourthPeriod;
    revisionCompanyYear.revisionCompany = revisionCompanyEntity;

    try {
      await revisionCompanyYear.save();
      return revisionCompanyYear;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
