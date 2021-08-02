import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CompanyController } from './company.controller';
import { AuthModule } from '../auth/auth.module';
import { CompanyService } from './company.service';
import { CompanyUserRepository } from '../company-user/company-user.repository';
import { UserEntity } from '../user/user.entity';
import { CompanyUserEntity } from '../company-user/company-user.entity';
import { UserRepository } from '../user/user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      UserEntity,
      UserRepository,
      CompanyUserEntity,
      CompanyRepository,
      CompanyUserRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
