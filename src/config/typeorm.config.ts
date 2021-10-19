import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { CompanyBalanceEntity } from 'src/core/company-balance/company-balance.entity';
import { CompanyMemberEntity } from 'src/core/company-member/company-memeber.entity';
import { CompanyEntity } from 'src/core/company/company.entity';
import { FileEntity } from 'src/core/file/file.entity';
import { PaymentEntity } from 'src/core/payment/payment.entity';
import { RevisionEntity } from 'src/core/revision/revision.entity';
import { UserEntity } from '../core/user/user.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  CompanyEntity,
  CompanyMemberEntity,
  FileEntity,
  RevisionEntity,
  CompanyBalanceEntity,
  PaymentEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
