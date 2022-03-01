import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from './referal-payment.repository';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { UserEntity } from '../user/user.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';

@Injectable()
export class ReferalPaymentService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(ReferalPaymentRepository)
    private referalPaymentRepository: ReferalPaymentRepository,
  ) {}

  async getReferalPaymentListByUser(
    user: UserEntity,
  ): Promise<ReferalPaymentEntity[]> {
    return await this.referalPaymentRepository.getReferalPaymentList(user);
  }

  async createReferalPayment(
    amount: number,
    type: REFERAL_PAYMENT_TYPE,
    referal: ReferalEntity,
    referalMember?: ReferalMemberEntity,
  ): Promise<void> {
    const referalPayment =
      await this.referalPaymentRepository.createReferalPayment(
        amount,
        type,
        referal,
        referalMember,
      );

    const result = await this.referalRepository.updateReferalBalance(
      referal,
      referalPayment,
    );

    await referalPayment.save();

    return result;
  }
}
