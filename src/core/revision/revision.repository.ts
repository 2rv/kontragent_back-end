import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { RevisionEntity } from './revision.entity';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { REVISION_STATUS } from './enum/revision-status.enum';

@EntityRepository(RevisionEntity)
export class RevisionRepository extends Repository<RevisionEntity> {
  async createRevision(company: CompanyEntity): Promise<RevisionEntity> {
    const revision: RevisionEntity = new RevisionEntity();

    revision.company = company;
    revision.status = REVISION_STATUS.NEW;

    try {
      await revision.save();
      return revision;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateRevisionReview(
    revision: RevisionEntity,
    updateRevisionDto: UpdateRevisionDto,
  ): Promise<RevisionEntity> {
    if (updateRevisionDto.status) {
      revision.status = updateRevisionDto.status;
    }

    if (updateRevisionDto.additionPrice) {
      revision.additionPrice = updateRevisionDto.additionPrice;
    }

    await revision.save();

    return revision;
  }

  async getRevisionListByCompany(company: CompanyEntity) {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.company', 'company');
    query.where('company.id = :id', { id: company.id });
    query.select(['revision.id', 'revision.createDate', 'revision.status']);
    return query.getMany();
  }

  async getRevisionList() {
    const query = this.createQueryBuilder('revision');
    query.select(['revision.id', 'revision.createDate', 'revision.status']);
    return query.getMany();
  }
}
