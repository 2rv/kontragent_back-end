import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KontragentEntity } from './kontragent.entity';
import { KontragentController } from './kontragent.controller';
import { AuthModule } from '../auth/auth.module';
import { KontragentService } from './kontragent.service';
import { KontragentRepository } from './kontragent.repository';
import { CompanyRepository } from '../company/company.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KontragentEntity,
      KontragentRepository,
      CompanyRepository,
      CompanyMemberRepository,
      CompanyBalanceRepository,
    ]),
    AuthModule,
  ],
  controllers: [KontragentController],
  providers: [KontragentService],
})
export class KontragentModule {}
