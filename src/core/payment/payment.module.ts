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

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
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
    ]),
    AuthModule,
  ],
})
export class PaymentModule {}
