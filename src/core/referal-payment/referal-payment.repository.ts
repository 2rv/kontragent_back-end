import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';
import { UserEntity } from '../user/user.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';

@EntityRepository(ReferalPaymentEntity)
export class ReferalPaymentRepository extends Repository<ReferalPaymentEntity> {
  async getReferalPaymentList(
    user: UserEntity,
  ): Promise<ReferalPaymentEntity[]> {
    return await this.createQueryBuilder('referalPayment')
      .leftJoin('referalPayment.referalMember', 'referalMember')
      .leftJoin('referalMember.user', 'referalMemberUser')
      .leftJoin('referalPayment.referal', 'referal')
      .leftJoin('referal.user', 'referalUser')
      .select(['referalPayment'])
      .where('referalUser.id = :id', { id: user.id })
      .getMany();
  }

  async createReferalPayment(
    amount: number,
    type: REFERAL_PAYMENT_TYPE,
    referal: ReferalEntity,
    referalMember?: ReferalMemberEntity,
  ): Promise<ReferalPaymentEntity> {
    const referalPayment = new ReferalPaymentEntity();

    referalPayment.amount = amount;
    referalPayment.type = type;
    referalPayment.referal = referal;

    if (type === REFERAL_PAYMENT_TYPE.NEW_REFERAL && referalMember) {
      referalPayment.referalMember = referalMember;
    }

    try {
      return referalPayment;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
