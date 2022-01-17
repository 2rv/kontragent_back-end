import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { ReferalPaymentController } from './referal-payment.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalPaymentService } from './referal-payment.service';

import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from './referal-payment.repository';
import { ReferalMemberRepository } from '../referal-member/referal-member.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferalPaymentEntity,
      ReferalMemberEntity,
      ReferalEntity,
      ReferalRepository,
      ReferalPaymentRepository,
      ReferalMemberRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReferalPaymentController],
  providers: [ReferalPaymentService],
  exports: [ReferalPaymentService],
})
export class ReferalAchievementModule {}
