import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UnitpayService } from './unitpay.service';
import { UnitpayController } from './unitpay.controller';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { ReferalPaymentService } from '../referal-payment/referal-payment.service';

@Module({
  controllers: [UnitpayController],
  providers: [UnitpayService, CompanyBalanceService, ReferalPaymentService],
  imports: [TypeOrmModule.forFeature([]), AuthModule],
})
export class UnitpayModule {}
