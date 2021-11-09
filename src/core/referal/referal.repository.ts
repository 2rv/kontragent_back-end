import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { ReferalEntity } from './referal.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(ReferalEntity)
export class ReferalRepository extends Repository<ReferalEntity> {
  async createReferal(user: UserEntity): Promise<ReferalEntity> {
    const referal: ReferalEntity = new ReferalEntity();
    referal.user = user;
    try {
      await referal.save();
      return referal;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateReferalBalance(
    referal: ReferalEntity,
    award: number,
  ): Promise<void> {
    try {
      const currentBalance = referal.balance;
      this.update(referal, { balance: Number(currentBalance) + award });
    } catch {
      throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
    }
  }

  async getReferalInfoByUser(user: UserEntity): Promise<ReferalEntity> {
    const query = this.createQueryBuilder('referal');

    query.leftJoin('referal.referalMember', 'referalMember');
    query.leftJoin('referal.user', 'user');
    query.where('user.id = :id', { id: user.id });
    query.loadRelationCountAndMap(
      'referal.referalMemberCount',
      'referal.referalMember',
    );

    return await query.getOne();
  }
}
