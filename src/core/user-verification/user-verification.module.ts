import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModuleConfig } from 'src/config/cache.config';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationService } from './user-verification.service';

import { ReferrerRepository } from '../referrer/referrer.repository';
import { ReferralRepository } from '../referral/referral.repository';
import { ReferrerAwardRepository } from '../referrer-award/referrer-award.repository';
import { ReferrerAwardModule } from '../referrer-award/referrer-award.module';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([
      UserRepository,
      ReferrerRepository,
      ReferralRepository,
      ReferrerAwardRepository,
      UserEntity,
    ]),
    AuthModule,
    MailModule,
    ReferrerAwardModule,
  ],
  controllers: [UserVerificationController],
  providers: [UserVerificationService],
})
export class UserVerificationModule {}
