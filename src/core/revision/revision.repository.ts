import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { RevisionEntity } from './revision.entity';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { REVISION_STATUS } from './enum/revision-status.enum';
import { CreateRevisionKontragentDto } from './dto/create-revision-kontragent.dto';
import { UserEntity } from '../user/user.entity';

@EntityRepository(RevisionEntity)
export class RevisionRepository extends Repository<RevisionEntity> {
  async createRevisionNew(
    newRevisionData: CreateRevisionKontragentDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<RevisionEntity> {
    const revisionKontragent = newRevisionData.kontragents.map((item) => {
      return {
        kontragent: { id: item.kontragentId },
        period: item.years,
        description: item.description,
        files: item.fileIdList.map((id) => ({ id })),
      };
    });

    try {
      return await this.save({
        status: REVISION_STATUS.NEW,
        price: 0,
        creator: creator,
        company: company,
        revisionKontragent: revisionKontragent,
      });
    } catch (error) {
      console.log(error);
      // throw new InternalServerErrorException();
    }
  }

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
      revision.price = updateRevisionDto.additionPrice;
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

  async getAccountRevisionReview(
    revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.revisionKontragent', 'revisionKontragent');
    query.leftJoin('revisionKontragent.files', 'revisionKontragentFiles');
    query.leftJoin(
      'revisionKontragent.kontragent',
      'revisionKontragentKontragent',
    );
    query.where('revision.id = :id', { id: revision.id });
    query.select([
      'revision.id',
      'revision.createDate',
      'revision.price',
      'revision.status',
      'revisionKontragent.id',
      'revisionKontragent.period',
      'revisionKontragent.description',
      'revisionKontragentFiles',
      'revisionKontragentKontragent',
    ]);
    return query.getOne();
  }
}
