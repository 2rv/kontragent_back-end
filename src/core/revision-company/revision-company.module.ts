import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileRepository } from '../file/file.repository';
import { RevisionCompanyService } from './revision-company.service';
import { RevisionCompanyRepository } from './revision-company.repository';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { RevisionCompanyYearRepository } from '../revision-company-year/revision-company-year.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RevisionCompanyRepository,
      FileRepository,
      RevisionEntity,
      RevisionCompanyEntity,
      RevisionCompanyYearRepository,
    ]),
  ],
  controllers: [],
  providers: [RevisionCompanyService],
})
export class RevisionModule {}
