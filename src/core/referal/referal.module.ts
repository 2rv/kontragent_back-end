import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalEntity } from './referal.entity';
import { ReferalRepository } from './referal.repository';
import { ReferalController } from './referal.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalService } from './referal.service';
import { ReferalPaymentModule } from '../referal-payment/referal-payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferalEntity, ReferalRepository]),
    AuthModule,
    ReferalPaymentModule,
  ],
  controllers: [ReferalController],
  providers: [ReferalService],
  exports: [ReferalService],
})
export class ReferalModule {}
