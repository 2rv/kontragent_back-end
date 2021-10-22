import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { REFERAL_ACHIEVEMENT_TYPE } from './enum/referal-achievement-type.enum';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalAchievementRepository } from './referal-achievement.repository';
import { ReferalAchievementEntity } from './referal-achievement.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ReferalAchievementService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(ReferalAchievementRepository)
    private referalAchievementRepository: ReferalAchievementRepository,
  ) {}

  async createReferalAchievement(
    award: number,
    type: REFERAL_ACHIEVEMENT_TYPE,
    referalMember: ReferalMemberEntity,
  ): Promise<void> {
    const referalAchievement =
      await this.referalAchievementRepository.createReferalAchievement(
        award,
        type,
        referalMember,
        referalMember.referal,
      );

    this.referalRepository.updateReferalBalance(
      referalMember.referal,
      referalAchievement,
    );
  }

  async getReferalAchievementListByUser(
    user: UserEntity,
  ): Promise<ReferalAchievementEntity[]> {
    return await this.referalAchievementRepository.getReferalAchievementList(
      user,
    );
  }
}
