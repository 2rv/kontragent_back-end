import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDataEntity } from './company-data.entity';
import { CompanyDataController } from './company-data.controller';
import { CompanyDataService } from './company-data.service';
import { CompanyDataRepository } from './company-data.repository';
import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from '../company/company.entity';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { KontragentRepository } from '../kontragent/kontragent.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyDataEntity,
      CompanyDataRepository,
      KontragentEntity,
      KontragentRepository,
      CompanyRepository,
      CompanyMemberRepository,
      CompanyMemberEntity,
    ]),
    AuthModule,
  ],
  controllers: [CompanyDataController],
  providers: [CompanyDataService],
})
export class CompanyDataModule {}
