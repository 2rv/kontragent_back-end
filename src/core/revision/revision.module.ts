import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { CompanyBalanceModule } from '../company-balance/company-balance.module';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { FileRepository } from '../file/file.repository';
import { PaymentRepository } from '../payment/payment.repository';
import { RevisionController } from './revision.controller';
import { RevisionEntity } from './revision.entity';
import { RevisionRepository } from './revision.repository';
import { RevisionService } from './revision.service';
import { RevisionCompanyService } from '../revision-company/revision-company.service';
import { RevisionCompanyRepository } from '../revision-company/revision-company.repository';
import { RevisionCompanyYearRepository } from '../revision-company-year/revision-company-year.repository';

@Module({
  imports: [
    AuthModule,
    CompanyBalanceModule,
    TypeOrmModule.forFeature([
      FileRepository,
      RevisionRepository,
      RevisionEntity,
      CompanyRepository,
      CompanyMemberRepository,
      CompanyEntity,
      CompanyMemberEntity,
      CompanyBalanceRepository,
      CompanyBalanceEntity,
      PaymentRepository,
      RevisionCompanyRepository,
      RevisionCompanyYearRepository,
    ]),
  ],
  controllers: [RevisionController],
  providers: [RevisionService, CompanyBalanceService, RevisionCompanyService],
})
export class RevisionModule {}
