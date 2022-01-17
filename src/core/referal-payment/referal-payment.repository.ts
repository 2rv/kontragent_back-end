import { Repository, EntityRepository } from 'typeorm';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ReferalPaymentEntity } from './referal-payment.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';
import { UserEntity } from '../user/user.entity';

@EntityRepository(ReferalPaymentEntity)
export class ReferalPaymentRepository extends Repository<ReferalPaymentEntity> {
  async createReferalPayment(
    award: number,
    type: REFERAL_PAYMENT_TYPE,
    referalMember: ReferalMemberEntity,
    referal: ReferalEntity,
  ): Promise<number> {
    const referalPayment: ReferalPaymentEntity = new ReferalPaymentEntity();
    referalPayment.award = award;
    referalPayment.type = type;
    referalPayment.referalMember = referalMember;
    referalPayment.referal = referal;

    try {
      await referalPayment.save();
      return award;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getReferalPaymentList(
    user: UserEntity,
  ): Promise<ReferalPaymentEntity[]> {
    return await this.createQueryBuilder('referalPayment')
      .leftJoin('referalPayment.referalMember', 'referalMember')
      .leftJoin('referalMember.user', 'referalMemberUser')
      .leftJoin('referalPayment.referal', 'referal')
      .leftJoin('referal.user', 'referalUser')
      .select([
        'referalPayment.id',
        'referalMember.id',
        'referalMemberUser.id',
        'referalMemberUser.firstname',
        'referalMemberUser.lastname',
        'referalPayment.award',
        'referalPayment.type',
      ])
      .where('referalUser.id = :id', { id: user.id })
      .getMany();
  }
}
