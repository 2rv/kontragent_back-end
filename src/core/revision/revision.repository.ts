import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { RevisionEntity } from './revision.entity';

import { REVISION_STATUS } from './enum/revision-status.enum';
import { UpdateRevisionDto } from './dto/update-revision.dto';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { KontragentEntity } from '../kontragent/kontragent.entity';

@EntityRepository(RevisionEntity)
export class RevisionRepository extends Repository<RevisionEntity> {
  async createRevision(
    createRevisionDto: CreateRevisionDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<RevisionEntity> {
    const revisionKontragent = createRevisionDto.kontragents.map((item) => {
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
        creator: creator,
        company: company,
        revisionKontragent: revisionKontragent,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getRevisionList(company: CompanyEntity): Promise<RevisionEntity[]> {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.company', 'company');
    query.where('company.id = :id', { id: company.id });
    query.select(['revision.id', 'revision.createDate', 'revision.status']);
    return query.getMany();
  }

  async getRevision(revision: RevisionEntity): Promise<RevisionEntity> {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.filesReview', 'filesReview');
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
      'revision.review',
      'filesReview',
      'revisionKontragent.id',
      'revisionKontragent.period',
      'revisionKontragent.description',
      'revisionKontragentFiles',
      'revisionKontragentKontragent',
    ]);
    return query.getOne();
  }

  async getAdminRevisionList() {
    const query = this.createQueryBuilder('revision');
    query.select(['revision.id', 'revision.createDate', 'revision.status']);
    return query.getMany();
  }

  async getAdminRevision(revision: RevisionEntity): Promise<RevisionEntity> {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.company', 'company');
    query.leftJoin('revision.creator', 'creator');
    query.leftJoin('revision.filesReview', 'filesReview');
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
      'revision.review',
      'filesReview',
      'company',
      'creator.id',
      'creator.login',
      'creator.firstname',
      'creator.lastname',
      'revisionKontragent.id',
      'revisionKontragent.period',
      'revisionKontragent.description',
      'revisionKontragentFiles',
      'revisionKontragentKontragent',
    ]);

    return query.getOne();
  }

  async updateRevision(
    revision: RevisionEntity,
    updateRevisionDto: UpdateRevisionDto,
  ): Promise<RevisionEntity> {
    try {
      if (updateRevisionDto.status) {
        revision.status = +updateRevisionDto.status;
      }

      if (typeof updateRevisionDto.price === 'number') {
        revision.price = updateRevisionDto.price;
      }

      if (updateRevisionDto.review) {
        revision.review = updateRevisionDto.review;
      }
      revision.filesReview = [];
      return await revision.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getRevisionKontragentList(
    company: CompanyEntity,
    kontragent: KontragentEntity,
  ): Promise<RevisionEntity[]> {
    const query = this.createQueryBuilder('revision');
    query.leftJoin('revision.company', 'company');
    query.leftJoin('revision.revisionKontragent', 'revisionKontragent');
    query.leftJoin('revisionKontragent.kontragent', 'kontragent');
    query.where('company.id = :id', { id: company.id });
    query.andWhere('kontragent.id = :id', { id: kontragent.id });
    query.select([
      'revision.id',
      'revision.createDate',
      'revision.status',
      'company.id',
      'kontragent.id',
    ]);
    return query.getMany();
  }

  async getRevisionCount(): Promise<number> {
    const query = this.createQueryBuilder('revision');
    return await query.getCount();
  }
}
