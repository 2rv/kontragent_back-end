import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { ReferrerEntity } from './referrer.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(ReferrerEntity)
export class ReferrerRepository extends Repository<ReferrerEntity> {
  async createReferrer(user: UserEntity): Promise<ReferrerEntity> {
    const referrer: ReferrerEntity = new ReferrerEntity();
    referrer.user = user;
    try {
      await referrer.save();
      return referrer;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateReferrerBalance(
    referrer: ReferrerEntity,
    award: number,
  ): Promise<void> {
    try {
      const currentBalance = referrer.balance;
      this.update(referrer, { balance: currentBalance + award });
    } catch {
      throw new BadRequestException('CHANGE.COULDNT_UPDATE_REFERRER_BALANCE');
    }
  }
}
