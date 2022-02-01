import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
})
export class FileModule {}
