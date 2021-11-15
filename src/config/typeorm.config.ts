import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { CompanyBalanceEntity } from 'src/core/company-balance/company-balance.entity';
import { CompanyMemberEntity } from 'src/core/company-member/company-memeber.entity';
import { CompanyEntity } from 'src/core/company/company.entity';
import { FileEntity } from 'src/core/file/file.entity';
import { PaymentEntity } from 'src/core/payment/payment.entity';
import { RevisionEntity } from '../core/revision/revision.entity';
import { RevisionCompanyEntity } from 'src/core/revision-company/revision-company.entity';
import { UserEntity } from '../core/user/user.entity';

import { ReferalEntity } from '../core/referal/referal.entity';
import { ReferalMemberEntity } from '../core/referal-member/referal-member.entity';
import { ReferalAchievementEntity } from '../core/referal-achievement/referal-achievement.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  CompanyEntity,
  CompanyMemberEntity,
  FileEntity,
  RevisionEntity,
  RevisionCompanyEntity,
  CompanyBalanceEntity,
  PaymentEntity,

  ReferalEntity,
  ReferalMemberEntity,
  ReferalAchievementEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
  ssl: { rejectUnauthorized: false },
  // logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
