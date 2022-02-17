import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ReferalService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
  ) {}

  async getUserReferalInfoByUser(user: UserEntity): Promise<ReferalEntity> {
    return await this.referalRepository.getReferalInfoByUser(user);
  }

  async getReferalBalance(user: UserEntity): Promise<ReferalEntity> {
    return await this.referalRepository.getReferalBalance(user);
  }

  async createReferalBalancePayment(user: UserEntity, price: number) {
    const referalBalance = await this.referalRepository.getReferalBalance(user);
    if (!referalBalance.balance) {
      return price;
    }
    const isZero = price - referalBalance.balance <= 0; // если цена больше рефералки будет true
    const result = isZero ? 0 : price - referalBalance.balance; // если isZero true то выводим 0 иначе остаток от Price

    referalBalance.balance = isZero ? referalBalance.balance - price : 0;
    await referalBalance.save();

    return result;
  }
}
