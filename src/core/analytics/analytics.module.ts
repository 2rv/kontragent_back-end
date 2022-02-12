import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../company/company.repository';
import { KontragentRepository } from '../kontragent/kontragent.repository';
import { RevisionRepository } from '../revision/revision.repository';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KontragentRepository,
      RevisionRepository,
      CompanyRepository,
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
