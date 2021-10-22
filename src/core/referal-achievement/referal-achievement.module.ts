import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalAchievementEntity } from './referal-achievement.entity';
import { ReferalAchievementController } from './referal-achievement.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalAchievementService } from './referal-achievement.service';

import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalAchievementRepository } from './referal-achievement.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferalAchievementEntity,
      ReferalMemberEntity,
      ReferalEntity,
      ReferalRepository,
      ReferalAchievementRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReferalAchievementController],
  providers: [ReferalAchievementService],
  exports: [ReferalAchievementService],
})
export class ReferalAchievementModule {}
