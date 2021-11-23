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
import { ReferalModule } from './core/referal/referal.module';
import { ReferalMemberModule } from './core/referal-member/referal-member.module';
import { ReferalAchievementModule } from './core/referal-achievement/referal-achievement.module';
import { PostModule } from './core/post/post.module';
import { CommentModule } from './core/comment/comment.module';
import { InviteModule } from './core/invite/invite.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    InviteModule,
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
    ReferalModule,
    ReferalMemberModule,
    ReferalAchievementModule,
    InviteModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
