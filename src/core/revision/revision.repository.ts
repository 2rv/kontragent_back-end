import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RevisionEntity } from './revision.entity';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';

@EntityRepository(RevisionEntity)
export class RevisionRepository extends Repository<RevisionEntity> {
  async createRevision(
    createRevisionDto: CreateRevisionDto,
    company: CompanyEntity,
  ): Promise<RevisionEntity> {
    const revision: RevisionEntity = new RevisionEntity();

    revision.company = company;
    revision.description = createRevisionDto.description;
    revision.title = createRevisionDto.description;

    try {
      await revision.save();
      return revision;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateRevisionReview(
    revision: RevisionEntity,
    updateRevisionDto: UpdateRevisionDto,
  ): Promise<RevisionEntity> {
    if (updateRevisionDto.review) {
      revision.review = updateRevisionDto.review;
    }

    if (updateRevisionDto.status) {
      revision.status = updateRevisionDto.status;
    }

    if (updateRevisionDto.price) {
      revision.price = updateRevisionDto.price;
    }

    await revision.save();

    return revision;
  }

  async getRevisionListByCompany(company: CompanyEntity) {
    const query = this.createQueryBuilder('revision');

    query.leftJoin('revision.company', 'company');

    query.where('company.id = :id', { id: company.id });

    query.select([
      'revision.id',
      'revision.title',
      'revision.status',
      'revision.price',
    ]);

    return query.getMany();
  }

  async getRevisionList() {
    const query = this.createQueryBuilder('revision');

    query.select([
      'revision.id',
      'revision.title',
      'revision.status',
      'revision.price',
    ]);

    return query.getMany();
  }
}
