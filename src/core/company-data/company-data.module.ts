import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDataEntity } from './company-data.entity';
import { CompanyDataController } from './company-data.controller';
import { CompanyDataService } from './company-data.service';
import { CompanyDataRepository } from './company-data.repository';
import { AuthModule } from '../auth/auth.module';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from '../company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyDataEntity,
      CompanyDataRepository,
      CompanyEntity,
      CompanyRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyDataController],
  providers: [CompanyDataService],
})
export class CompanyDataModule {}
