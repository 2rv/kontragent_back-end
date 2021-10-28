import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalMemberEntity } from './referal-member.entity';
import { ReferalMemberController } from './referal-member.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalMemberService } from './referal-member.service';

import { UserEntity } from '../user/user.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { MailModule } from '../mail/mail.module';
import { UserRepository } from '../user/user.repository';
import { ReferalRepository } from '../referal/referal.repository';
import { CompanyRepository } from '../company/company.repository';
import { ReferalMemberRepository } from './referal-member.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferalMemberRepository,
      ReferalEntity,
      ReferalMemberEntity,
      UserEntity,
      UserRepository,
      ReferalRepository,
      CompanyRepository,
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [ReferalMemberController],
  providers: [ReferalMemberService],
})
export class ReferalMemberModule {}
