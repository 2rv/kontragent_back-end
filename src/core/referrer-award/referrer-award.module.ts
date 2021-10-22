import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferrerAwardEntity } from './referrer-award.entity';
import { ReferrerAwardController } from './referrer-award.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferrerAwardService } from './referrer-award.service';

import { ReferralEntity } from '../referral/referral.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';

import { ReferrerRepository } from '../referrer/referrer.repository';
import { ReferrerAwardRepository } from './referrer-award.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferrerAwardEntity,
      ReferralEntity,
      ReferrerEntity,
      ReferrerRepository,
      ReferrerAwardRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReferrerAwardController],
  providers: [ReferrerAwardService],
  exports: [ReferrerAwardService],
})
export class ReferrerAwardModule {}
