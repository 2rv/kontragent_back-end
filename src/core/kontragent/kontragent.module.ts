import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KontragentEntity } from './kontragent.entity';
import { KontragentController } from './kontragent.controller';
import { AuthModule } from '../auth/auth.module';
import { KontragentService } from './kontragent.service';
import { KontragentRepository } from './kontragent.repository';
import { CompanyRepository } from '../company/company.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { ReferalPaymentModule } from '../referal-payment/referal-payment.module';
import { ReferalModule } from '../referal/referal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KontragentEntity,
      KontragentRepository,
      CompanyRepository,
      CompanyMemberRepository,
      CompanyMemberEntity,
    ]),
    AuthModule,
    ReferalPaymentModule,
    ReferalModule,
  ],
  controllers: [KontragentController],
  providers: [KontragentService],
})
export class KontragentModule {}
