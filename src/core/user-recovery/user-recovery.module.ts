import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModuleConfig } from 'src/config/cache.config';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserRecoveryController } from './user-recovery.controller';
import { UserRecoveryService } from './user-recovery.service';

@Module({
  imports: [
    CacheModule.register(CacheModuleConfig),
    TypeOrmModule.forFeature([UserRepository, UserEntity]),
  ],
  controllers: [UserRecoveryController],
  providers: [UserRecoveryService],
})
export class UserRecoveryModule {}
