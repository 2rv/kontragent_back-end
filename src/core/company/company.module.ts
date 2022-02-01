import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompanyController } from './company.controller';
import { AuthModule } from '../auth/auth.module';
import { CompanyService } from './company.service';
import { CompanyMemberModule } from '../company-member/company-member.module';
import { CompanyRepository } from './company.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { UserEntity } from '../user/user.entity';
import { ReviewRepository } from '../review/review.repository';

@Module({
  imports: [
    CompanyMemberModule,
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      CompanyMemberRepository,
      CompanyBalanceRepository,
      CompanyBalanceEntity,
      UserEntity,
      ReviewRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
