import { Repository, EntityRepository } from 'typeorm';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ReferrerAwardEntity } from './referrer-award.entity';
import { ReferralEntity } from '../referral/referral.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';

import { REFERRER_AWARD_TYPE } from './enum/referrer-award-type.enum';

@EntityRepository(ReferrerAwardEntity)
export class ReferrerAwardRepository extends Repository<ReferrerAwardEntity> {
  async createReferrerAward(
    award: number,
    type: REFERRER_AWARD_TYPE,
    referral: ReferralEntity,
    referrer: ReferrerEntity,
  ): Promise<number> {
    const referrerAward: ReferrerAwardEntity = new ReferrerAwardEntity();
    referrerAward.award = award;
    referrerAward.type = type;
    referrerAward.referral = referral;
    referrerAward.referrer = referrer;

    try {
      await referrerAward.save();
      return award;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
