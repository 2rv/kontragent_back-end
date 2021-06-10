import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as config from 'config';
import { UserEntity } from '../core/user/user.entity';

const CACHE_CONFIG = config.get('CACHE');

export const ApiEntities = [UserEntity];

export const CacheModuleConfig: CacheModuleOptions = {
  store: redisStore,
  host: CACHE_CONFIG.HOST,
  port: CACHE_CONFIG.PORT,
  password: CACHE_CONFIG.PASSWORD,
  ttl: CACHE_CONFIG.TTL,
};
