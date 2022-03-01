import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalPaymentEntity } from './referal-payment.entity';
import { ReferalPaymentController } from './referal-payment.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalPaymentService } from './referal-payment.service';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalPaymentRepository } from './referal-payment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReferalPaymentEntity,
      ReferalPaymentRepository,
      ReferalRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReferalPaymentController],
  providers: [ReferalPaymentService],
  exports: [ReferalPaymentService],
})
export class ReferalPaymentModule {}
