import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { PaymentEntity } from '../payment/payment.entity';
import { PaymentRepository } from '../payment/payment.repository';
import { UserEntity } from '../user/user.entity';
import { CompanyBalanceController } from './company-balance.controller';
import { CompanyBalanceService } from './company-balance.service';

@Module({
  controllers: [CompanyBalanceController],
  providers: [CompanyBalanceService],
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      UserEntity,
      CompanyBalanceRepository,
      CompanyBalanceEntity,
      PaymentRepository,
      PaymentEntity,
      CompanyMemberRepository,
      CompanyMemberEntity,
    ]),
    AuthModule,
  ],
})
export class CompanyBalanceModule {}
