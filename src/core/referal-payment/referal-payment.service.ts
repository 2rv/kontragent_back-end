import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from './referal-payment.repository';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from '../company/company.entity';
import { ReferalMemberRepository } from '../referal-member/referal-member.repository';

@Injectable()
export class ReferalPaymentService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(ReferalPaymentRepository)
    private referalPaymentRepository: ReferalPaymentRepository,
    @InjectRepository(ReferalMemberRepository)
    private referalMemberRepository: ReferalMemberRepository,
  ) {}

  async createReferalPayment(
    amount: number,
    type: REFERAL_PAYMENT_TYPE,
    referalMember: ReferalMemberEntity,
  ): Promise<void> {
    const referalPayment =
      await this.referalPaymentRepository.createReferalPayment(
        amount,
        type,
        referalMember,
        referalMember.referal,
      );

    if (referalPayment) {
      type === REFERAL_PAYMENT_TYPE.OUT
        ? this.referalRepository.subtractReferalBalance(
            referalMember.referal,
            amount,
          )
        : this.referalRepository.addReferalBalance(
            referalMember.referal,
            amount,
          );
    }
  }

  async createCompanyReferalPayment(
    refillAmount: number,
    company: CompanyEntity,
  ): Promise<void> {
    //В РЕПО
    const referalMember = await this.referalMemberRepository
      .createQueryBuilder('referal-member')
      .leftJoin('referal-member.user', 'user')
      .leftJoin('referal-member.referal', 'referal')
      .leftJoin('user.company', 'company')
      .where('company.id IN (:...ids)', { ids: [company.id] })
      .select(['referal-member', 'referal'])
      .getOne();

    const award = refillAmount * 0.05;

    const referalPayment =
      await this.referalPaymentRepository.createReferalPayment(
        award,
        REFERAL_PAYMENT_TYPE.PAYMENT,
        referalMember,
        referalMember.referal,
      );

    if (referalPayment) {
      this.referalRepository.addReferalBalance(
        referalMember.referal,
        referalPayment,
      );
    }
  }

  async getReferalPaymentListByUser(
    user: UserEntity,
  ): Promise<ReferalPaymentEntity[]> {
    return await this.referalPaymentRepository.getReferalPaymentList(user);
  }
}
