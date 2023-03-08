import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { ReferalEntity } from './referal.entity';
import { UserEntity } from '../user/user.entity';
import { ReferalPaymentEntity } from '../referal-payment/referal-payment.entity';
import { REFERAL_PAYMENT_TYPE } from '../referal-payment/enum/referal-payment-type.enum';

@EntityRepository(ReferalEntity)
export class ReferalRepository extends Repository<ReferalEntity> {
  async createReferal(user: UserEntity): Promise<ReferalEntity> {
    const referal = new ReferalEntity();
    referal.user = user;
    try {
      return await referal.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
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

  async getReferalBalance(user: UserEntity): Promise<ReferalEntity> {
    const query = await this.createQueryBuilder('referal');
    query.leftJoin('referal.user', 'user');
    query.where('user.id = :id', { id: user.id });
    query.select(['referal.id', 'referal.balance', 'user.id']);
    return await query.getOne();
  }

  async updateReferalBalance(
    referal: ReferalEntity,
    referalPayment: ReferalPaymentEntity,
  ): Promise<void> {
    if (referalPayment.type === REFERAL_PAYMENT_TYPE.NEW_REFERAL) {
      try {
        await this.increment(
          { id: referal.id },
          'balance',
          referalPayment.amount,
        );
        return;
      } catch (error) {
        throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
      }
    }
    if (referalPayment.type === REFERAL_PAYMENT_TYPE.ADDED_KONTRAGENT_INFO) {
      try {
        await this.increment(
          { id: referal.id },
          'balance',
          referalPayment.amount,
        );
        return;
      } catch (error) {
        throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
      }
    }
    if (
      referalPayment.type ===
      REFERAL_PAYMENT_TYPE.USER_TO_REVISION_KONTRAGENT_PAY
    ) {
      try {
        await this.decrement(
          { id: referal.id },
          'balance',
          referalPayment.amount,
        );
        return;
      } catch (error) {
        throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
      }
    }
    if (
      referalPayment.type === REFERAL_PAYMENT_TYPE.USER_TO_REVISION_SELF_PAY
    ) {
      try {
        await this.decrement(
          { id: referal.id },
          'balance',
          referalPayment.amount,
        );
        return;
      } catch (error) {
        throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
      }
    }
    throw new BadRequestException('UNCORRECT_TRANSACTION');
  }
}
