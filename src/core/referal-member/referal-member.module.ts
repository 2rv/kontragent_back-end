import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalMemberEntity } from './referal-member.entity';
import { ReferalMemberController } from './referal-member.controller';
import { ReferalMemberService } from './referal-member.service';
import { UserEntity } from '../user/user.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { MailModule } from '../mail/mail.module';
import { UserRepository } from '../user/user.repository';
import { ReferalRepository } from '../referal/referal.repository';
import { CompanyRepository } from '../company/company.repository';
import { ReferalMemberRepository } from './referal-member.repository';
import { ReferalPaymentModule } from '../referal-payment/referal-payment.module';
import { CompanyEntity } from '../company/company.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferalMemberEntity,
      ReferalMemberRepository,
      UserEntity,
      UserRepository,
      ReferalEntity,
      ReferalRepository,
      CompanyEntity,
      CompanyRepository,
    ]),
    AuthModule,
    MailModule,
    ReferalPaymentModule,
  ],
  controllers: [ReferalMemberController],
  providers: [ReferalMemberService],
  exports: [ReferalMemberService],
})
export class ReferalMemberModule {}
