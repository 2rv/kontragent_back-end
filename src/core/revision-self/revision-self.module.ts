import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceModule } from '../company-balance/company-balance.module';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyRepository } from '../company/company.repository';
import { FileRepository } from '../file/file.repository';
import { ReferalModule } from '../referal/referal.module';
import { RevisionSelfController } from './revision-self.controller';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfRepository } from './revision-self.repository';
import { RevisionSelfService } from './revision-self.service';

@Module({
  imports: [
    AuthModule,
    CompanyBalanceModule,
    ReferalModule,
    TypeOrmModule.forFeature([
      RevisionSelfRepository,
      RevisionSelfEntity,
      CompanyRepository,
      CompanyMemberEntity,
      CompanyMemberRepository,
      FileRepository,
    ]),
  ],
  controllers: [RevisionSelfController],
  providers: [RevisionSelfService],
})
export class RevisionSelfModule {}
