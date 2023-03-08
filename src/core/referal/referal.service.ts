import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';
import { REFERAL_PAYMENT_TYPE } from '../referal-payment/enum/referal-payment-type.enum';
import { ReferalPaymentService } from '../referal-payment/referal-payment.service';

@Injectable()
export class ReferalService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    private referalPaymentService: ReferalPaymentService,
  ) {}

  async getUserReferalInfoByUser(user: UserEntity): Promise<ReferalEntity> {
    return await this.referalRepository.getReferalInfoByUser(user);
  }

  async getReferalBalance(user: UserEntity): Promise<ReferalEntity> {
    return await this.referalRepository.getReferalBalance(user);
  }
  async createReferalBalancePayment(
    user: UserEntity,
    type: REFERAL_PAYMENT_TYPE,
    price,
  ) {
    const referal = await this.getUserReferalInfoByUser(user);
    if (referal.balance) {
      // 1000 - 500 = 500 <= 0 - false - нехватило реф баланс 0
      const isZero = price - referal.balance <= 0; // проверяем остался ли реф баланс
      // false ? 1000 : 500 = 500 списываем 500 руб
      const amount = isZero ? price : referal.balance; // сколько спишется - если реф баланса хватило ? берем всю сумму : выдаём весь баланс
      await this.referalPaymentService.createReferalPayment(
        amount,
        type,
        referal,
      );
      return price - amount;
    } else {
      return price;
    }
  }
}
