import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceEntity } from './company-balance.entity';
import { CompanyBalanceRepository } from './company-balance.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { PaymentEntity } from '../payment/payment.entity';
import { PaymentRepository } from '../payment/payment.repository';
import { UserEntity } from '../user/user.entity';
import { CompanyBalanceController } from './company-balance.controller';
import { CompanyBalanceService } from './company-balance.service';
import { ReferalPaymentService } from '../referal-payment/referal-payment.service';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from '../referal-payment/referal-payment.repository';
import { ReferalMemberRepository } from '../referal-member/referal-member.repository';

@Module({
  controllers: [CompanyBalanceController],
  providers: [CompanyBalanceService, ReferalPaymentService],
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      UserEntity,
      CompanyBalanceRepository,
      CompanyBalanceEntity,
      PaymentRepository,
      PaymentEntity,
      ReferalRepository,
      CompanyMemberRepository,
      CompanyMemberEntity,
      ReferalPaymentRepository,
      ReferalMemberRepository,
    ]),
    AuthModule,
  ],
})
export class CompanyBalanceModule {}
