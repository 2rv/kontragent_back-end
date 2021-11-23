import { Repository, EntityRepository } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';

import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { CompanyEntity } from '../company/company.entity';

import { CreateRevisionCompanyDto } from './dto/create-revision-company.dto';
import { CreateRevisionOwnCompanyDto } from '../revision-company/dto/create-revision-own-company.dto';

@EntityRepository(RevisionCompanyEntity)
export class RevisionCompanyRepository extends Repository<RevisionCompanyEntity> {
  async createRevisionCompany(
    createRevisionCompanyDto: CreateRevisionCompanyDto,
    revision: RevisionEntity,
  ): Promise<RevisionCompanyEntity> {
    const revisionCompany: RevisionCompanyEntity = new RevisionCompanyEntity();

    revisionCompany.name = createRevisionCompanyDto.name;
    revisionCompany.inn = createRevisionCompanyDto.inn;
    revisionCompany.description = createRevisionCompanyDto.description;
    revisionCompany.revision = revision;

    try {
      await revisionCompany.save();
      return revisionCompany;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createSelfRevisionCompany(
    createRevisionOwnCompanyDto: CreateRevisionOwnCompanyDto,
    revision: RevisionEntity,
    company: CompanyEntity,
    ): Promise<RevisionCompanyEntity> {
    const revisionCompany: RevisionCompanyEntity = new RevisionCompanyEntity();

    revisionCompany.name = company.name;
    revisionCompany.inn = company.inn;
    revisionCompany.description = createRevisionOwnCompanyDto.description;
    revisionCompany.revision = revision;

    try {
      await revisionCompany.save();
      return revisionCompany;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
