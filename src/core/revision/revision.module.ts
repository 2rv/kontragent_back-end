import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceModule } from '../company-balance/company-balance.module';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyRepository } from '../company/company.repository';
import { FileRepository } from '../file/file.repository';
import { KontragentRepository } from '../kontragent/kontragent.repository';
import { MailModule } from '../mail/mail.module';
import { PaymentRepository } from '../payment/payment.repository';
import { ReferalModule } from '../referal/referal.module';
import { RevisionKontragentModule } from '../revision-kontragent/revision-kontragent.module';
import { UserRepository } from '../user/user.repository';
import { RevisionController } from './revision.controller';
import { RevisionEntity } from './revision.entity';
import { RevisionRepository } from './revision.repository';
import { RevisionService } from './revision.service';

@Module({
  imports: [
    AuthModule,
    CompanyBalanceModule,
    RevisionKontragentModule,
    ReferalModule,
    MailModule,
    TypeOrmModule.forFeature([
      RevisionEntity,
      RevisionRepository,
      FileRepository,
      CompanyBalanceRepository,
      PaymentRepository,
      CompanyRepository,
      CompanyMemberEntity,
      CompanyMemberRepository,
      KontragentRepository,
      UserRepository,
    ]),
  ],
  controllers: [RevisionController],
  providers: [RevisionService, CompanyBalanceService],
})
export class RevisionModule {}
