import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { UserEntity } from '../user/user.entity';
import { CompanyMemberController } from './company-member.controller';
import { CompanyMemberRepository } from './company-member.repository';
import { CompanyMemberService } from './company-member.service';
import { CompanyMemberEntity } from './company-memeber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      UserEntity,
      CompanyMemberEntity,
      CompanyMemberRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyMemberController],
  providers: [CompanyMemberService],
})
export class CompanyMemberModule {}
