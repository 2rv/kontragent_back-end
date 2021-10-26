import { Repository, EntityRepository } from 'typeorm';
import { ReferalMemberEntity } from './referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(ReferalMemberEntity)
export class ReferalMemberRepository extends Repository<ReferalMemberEntity> {
  async createReferalMember(
    referalEntity: ReferalEntity,
    user: UserEntity,
  ): Promise<ReferalMemberEntity> {
    const referalMemberEntity: ReferalMemberEntity = new ReferalMemberEntity();
    referalMemberEntity.referal = referalEntity;
    referalMemberEntity.user = user;
    try {
      await referalMemberEntity.save();
      return referalMemberEntity;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getReferalMemberList(user: UserEntity): Promise<ReferalMemberEntity[]> {
    return this.createQueryBuilder('referal-memeber')
      .leftJoin('referal-memeber.referal', 'referal')
      .leftJoin('referal.user', 'referalUser')
      .leftJoin('referal-memeber.user', 'referalMemberUser')
      .select([
        'referalMemberUser.firstname',
        'referalMemberUser.lastname',
        'referal-memeber.createDate',
      ])
      .where('referalUser.id = :id', { id: user.id })
      .getMany();
  }

  async getReferalMemberByUser(user: UserEntity): Promise<ReferalMemberEntity> {
    const referalMemberQuery = this.createQueryBuilder('referal-member');
    referalMemberQuery.leftJoin('referal-member.user', 'referal-member-user');
    referalMemberQuery.where('referal-member-user.id = :id', {
      id: user.id,
    });
    return await referalMemberQuery.getOne();
  }
}
