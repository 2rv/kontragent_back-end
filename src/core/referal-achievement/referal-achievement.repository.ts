import { Repository, EntityRepository } from 'typeorm';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ReferalAchievementEntity } from './referal-achievement.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';

import { REFERAL_ACHIEVEMENT_TYPE } from './enum/referal-achievement-type.enum';

@EntityRepository(ReferalAchievementEntity)
export class ReferalAchievementRepository extends Repository<ReferalAchievementEntity> {
  async createReferalAchievement(
    award: number,
    type: REFERAL_ACHIEVEMENT_TYPE,
    referalMember: ReferalMemberEntity,
    referal: ReferalEntity,
  ): Promise<number> {
    const referalAchievement: ReferalAchievementEntity =
      new ReferalAchievementEntity();
    referalAchievement.award = award;
    referalAchievement.type = type;
    referalAchievement.referalMember = referalMember;
    referalAchievement.referal = referal;

    try {
      await referalAchievement.save();
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
