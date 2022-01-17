import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { UserEntity } from '../user/user.entity';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { ReferalPaymentService } from '../referal-payment/referal-payment.service';
import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from '../referal-payment/referal-payment.repository';
import { ReferalMemberRepository } from '../referal-member/referal-member.repository';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, CompanyBalanceService, ReferalPaymentService],
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      UserEntity,
      CompanyBalanceRepository,
      CompanyBalanceEntity,
      PaymentRepository,
      CompanyMemberEntity,
      CompanyMemberRepository,
      ReferalRepository,
      ReferalPaymentRepository,
      ReferalMemberRepository,
    ]),
    AuthModule,
  ],
})
export class PaymentModule {}
