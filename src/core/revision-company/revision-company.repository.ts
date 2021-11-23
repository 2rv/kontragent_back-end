import { Repository, EntityRepository } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';

import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { RevisionEntity } from '../revision/revision.entity';

import { CreateRevisionCompanyDto } from './dto/create-revision-company.dto';

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
}
