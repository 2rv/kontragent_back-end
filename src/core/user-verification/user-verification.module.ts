import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModuleConfig } from 'src/config/cache.config';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationService } from './user-verification.service';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalMemberRepository } from '../referal-member/referal-member.repository';
import { ReferalMemberService } from '../referal-member/referal-member.service';
import { ReferalAchievementRepository } from '../referal-achievement/referal-achievement.repository';
import { ReferalAchievementModule } from '../referal-achievement/referal-achievement.module';
import { CompanyRepository } from '../company/company.repository';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([
      UserRepository,
      ReferalRepository,
      ReferalMemberRepository,
      ReferalAchievementRepository,
      UserEntity,
      CompanyRepository,
    ]),
    AuthModule,
    MailModule,
    ReferalAchievementModule,
  ],
  controllers: [UserVerificationController],
  providers: [UserVerificationService, ReferalMemberService],
})
export class UserVerificationModule {}
