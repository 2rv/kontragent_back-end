import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { CreateRevisionSelfDto } from './dto/create-revision-self.dto';
import { UpdateRevisionSelfDto } from './dto/update-revision-self.dto';
import { REVISION_SELF_STATUS } from './enum/revision-self-status.enum';
import { RevisionSelfEntity } from './revision-self.entity';

@EntityRepository(RevisionSelfEntity)
export class RevisionSelfRepository extends Repository<RevisionSelfEntity> {
  async createRevisionSelf(
    createRevisionSelfDto: CreateRevisionSelfDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<RevisionSelfEntity> {
    try {
      const revisionSelf = new RevisionSelfEntity();
      revisionSelf.company = company;
      revisionSelf.creator = creator;
      revisionSelf.status = REVISION_SELF_STATUS.NEW;
      revisionSelf.description = createRevisionSelfDto.description;
      revisionSelf.period = createRevisionSelfDto.period;
      return revisionSelf.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getRevisionSelfList(
    company: CompanyEntity,
  ): Promise<RevisionSelfEntity[]> {
    const query = this.createQueryBuilder('revision-self');
    query.leftJoin('revision-self.company', 'company');
    query.where('company.id = :id', { id: company.id });
    query.select([
      'revision-self.id',
      'revision-self.createDate',
      'revision-self.status',
    ]);
    return query.getMany();
  }

  async getRevisionSelf(
    revision: RevisionSelfEntity,
  ): Promise<RevisionSelfEntity> {
    const query = this.createQueryBuilder('revision-self');
    query.leftJoin('revision-self.files', 'revisionSelfFiles');
    query.leftJoin('revision-self.filesReview', 'filesReview');
    query.where('revision-self.id = :id', { id: revision.id });
    query.select([
      'revision-self.id',
      'revision-self.createDate',
      'revision-self.price',
      'revision-self.status',
      'revision-self.review',
      'filesReview',
      'revision-self.period',
      'revision-self.description',
      'revisionSelfFiles',
    ]);
    return query.getOne();
  }

  async getAdminRevisionSelfList() {
    const query = this.createQueryBuilder('revision-self');
    query.select([
      'revision-self.id',
      'revision-self.createDate',
      'revision-self.status',
    ]);
    return query.getMany();
  }

  async getAdminRevisionSelf(
    revisionSelf: RevisionSelfEntity,
  ): Promise<RevisionSelfEntity> {
    const query = this.createQueryBuilder('revision-self');
    query.leftJoin('revision-self.files', 'revisionSelfFiles');
    query.leftJoin('revision-self.company', 'company');
    query.leftJoin('revision-self.creator', 'creator');
    query.leftJoin('revision-self.filesReview', 'filesReview');
    query.where('revision-self.id = :id', { id: revisionSelf.id });
    query.select([
      'revision-self.id',
      'revision-self.createDate',
      'revision-self.price',
      'revision-self.status',
      'revision-self.review',
      'filesReview',
      'revision-self.period',
      'revision-self.description',
      'revisionSelfFiles',

      'company',
      'creator.id',
      'creator.login',
      'creator.firstname',
      'creator.lastname',
    ]);

    return query.getOne();
  }

  async updateRevisionSelf(
    revision: RevisionSelfEntity,
    updateRevisionSelfDto: UpdateRevisionSelfDto,
  ): Promise<RevisionSelfEntity> {
    try {
      if (updateRevisionSelfDto.status) {
        revision.status = +updateRevisionSelfDto.status;
      }

      if (typeof updateRevisionSelfDto.price === 'number') {
        revision.price = updateRevisionSelfDto.price;
      }

      if (updateRevisionSelfDto.review) {
        revision.review = updateRevisionSelfDto.review;
      }
      revision.filesReview = [];
      return await revision.save();
    } catch (error) {
      console.log(error);
    }
  }
}
