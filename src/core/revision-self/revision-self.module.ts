import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceModule } from '../company-balance/company-balance.module';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyRepository } from '../company/company.repository';
import { FileRepository } from '../file/file.repository';
import { MailModule } from '../mail/mail.module';
import { ReferalModule } from '../referal/referal.module';
import { UserRepository } from '../user/user.repository';
import { RevisionSelfController } from './revision-self.controller';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfRepository } from './revision-self.repository';
import { RevisionSelfService } from './revision-self.service';

@Module({
  imports: [
    AuthModule,
    CompanyBalanceModule,
    ReferalModule,
    MailModule,
    TypeOrmModule.forFeature([
      RevisionSelfRepository,
      RevisionSelfEntity,
      CompanyRepository,
      CompanyMemberEntity,
      CompanyMemberRepository,
      FileRepository,
      UserRepository,
    ]),
  ],
  controllers: [RevisionSelfController],
  providers: [RevisionSelfService],
})
export class RevisionSelfModule {}
