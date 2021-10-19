import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './core/auth/auth.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { UserVerificationModule } from './core/user-verification/user-verification.module';
import { UserModule } from './core/user/user.module';
import { UserRecoveryModule } from './core/user-recovery/user-recovery.module';
import { MailModule } from './core/mail/mail.module';
import { CompanyMemberModule } from './core/company-member/company-member.module';
import { CompanyModule } from './core/company/company.module';
import { RevisionModule } from './core/revision/revision.module';
import { PaymentModule } from './core/payment/payment.module';
import { CompanyBalanceModule } from './core/company-balance/company-balance.module';
import { FileModule } from './core/file/file.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    MailModule,
    UserSettingsModule,
    UserVerificationModule,
    UserModule,
    UserRecoveryModule,
    CompanyModule,
    CompanyMemberModule,
    RevisionModule,
    PaymentModule,
    CompanyBalanceModule,
    FileModule,
  ],
})
export class AppModule {}
