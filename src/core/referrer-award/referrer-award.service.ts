import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { REFERRER_AWARD_TYPE } from './enum/referrer-award-type.enum';
import { ReferralEntity } from '../referral/referral.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';
import { ReferrerRepository } from '../referrer/referrer.repository';
import { ReferrerAwardRepository } from './referrer-award.repository';

@Injectable()
export class ReferrerAwardService {
  constructor(
    @InjectRepository(ReferrerRepository)
    private referrerRepository: ReferrerRepository,
    @InjectRepository(ReferrerAwardRepository)
    private referrerAwardRepository: ReferrerAwardRepository,
  ) {}

  async createReferrerAward(
    award: number,
    type: REFERRER_AWARD_TYPE,
    referral: ReferralEntity,
  ): Promise<void> {
    const referrerAward =
      await this.referrerAwardRepository.createReferrerAward(
        award,
        type,
        referral,
        referral.referrer,
      );

    this.referrerRepository.updateReferrerBalance(
      referral.referrer,
      referrerAward,
    );
  }
}
