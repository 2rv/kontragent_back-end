import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralEntity } from './referral.entity';
import { ReferralController } from './referral.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferralService } from './referral.service';

import { UserEntity } from '../user/user.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';
import { MailModule } from '../mail/mail.module';
import { UserRepository } from '../user/user.repository';
import { ReferrerRepository } from '../referrer/referrer.repository';
import { ReferralRepository } from './referral.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferralRepository,
      ReferrerEntity,
      ReferralEntity,
      UserEntity,
      UserRepository,
      ReferrerRepository,
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
