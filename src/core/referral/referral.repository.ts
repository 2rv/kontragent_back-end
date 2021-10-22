import { Repository, EntityRepository } from 'typeorm';
import { ReferralEntity } from './referral.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';
import { UserEntity } from '../user/user.entity';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(ReferralEntity)
export class ReferralRepository extends Repository<ReferralEntity> {
  async createReferral(
    referrerEntity: ReferrerEntity,
    user: UserEntity,
  ): Promise<ReferralEntity> {
    const referral: ReferralEntity = new ReferralEntity();
    referral.referrer = referrerEntity;
    referral.user = user;
    try {
      await referral.save();
      return referral;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
