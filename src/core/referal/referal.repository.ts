import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { ReferalEntity } from './referal.entity';
import { UserEntity } from '../user/user.entity';
import { REFERAL_ERROR } from './enum/referal-error.enum';

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

  async subtractReferalBalance(
    referal: ReferalEntity,
    amount: number,
  ): Promise<void> {
    try {
      const currentBalance = referal.balance;
      const newBalance = Number(currentBalance) - amount;

      this.update(referal, { balance: newBalance });
    } catch {
      throw new BadRequestException(
        REFERAL_ERROR.REFERAL_BALANCE_CANT_SUBTRACT,
      );
    }
  }

  async addReferalBalance(
    referal: ReferalEntity,
    amount: number,
  ): Promise<void> {
    try {
      const currentBalance = referal.balance;
      const newBalance = Number(currentBalance) + amount;

      this.update(referal, { balance: newBalance });
    } catch {
      throw new BadRequestException(REFERAL_ERROR.REFERAL_BALANCE_CANT_ADD);
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
