import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateReferalBalanceDto } from './dto/update-referal-balance.dto';
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

  async subtractUserReferalBalanceByUser(
    updateReferalBalanceDto: UpdateReferalBalanceDto,
    user: UserEntity,
  ): Promise<any> {
    const userReferal = await this.referalRepository.findOne({
      where: { user },
    });

    return await this.referalRepository.subtractReferalBalance(
      userReferal,
      updateReferalBalanceDto.amount,
    );
  }
}
