import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionCompanyYearController } from './revision-company-year.controller';
import { RevisionCompanyYearService } from './revision-company-year.service';
import { RevisionCompanyYearRepository } from './revision-company-year.repository';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserEntity,
      RevisionCompanyYearRepository,
    ]),
    AuthModule,
  ],
  providers: [RevisionCompanyYearService],
  exports: [RevisionCompanyYearService],
  controllers: [RevisionCompanyYearController],
})
export class FileModule {}
