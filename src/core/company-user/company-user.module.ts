import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyUserRepository } from '../company-user/company-user.repository';
import { UserEntity } from '../user/user.entity';
import { CompanyUserEntity } from '../company-user/company-user.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyUserController } from './company-user.controller';
import { CompanyUserService } from './company-user.service';
import { CompanyRepository } from '../company/company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      CompanyRepository,
      UserEntity,
      CompanyUserEntity,
      CompanyUserRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyUserController],
  providers: [CompanyUserService],
})
export class CompanyUserModule {}
