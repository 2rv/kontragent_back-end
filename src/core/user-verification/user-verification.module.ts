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
import { CompanyRepository } from '../company/company.repository';
import { ReferalMemberModule } from '../referal-member/referal-member.module';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([
      UserRepository,
      ReferalRepository,
      ReferalMemberRepository,
      UserEntity,
      CompanyRepository,
    ]),
    AuthModule,
    MailModule,
    ReferalMemberModule,
  ],
  controllers: [UserVerificationController],
  providers: [UserVerificationService],
  exports: [UserVerificationService],
})
export class UserVerificationModule {}
