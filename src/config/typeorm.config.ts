import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { UserEntity } from '../core/user/user.entity';
import { CompanyUserEntity } from '../core/company-user/company-user.entity';
import { CompanyEntity } from '../core/company/company.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [UserEntity, CompanyUserEntity, CompanyEntity];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
