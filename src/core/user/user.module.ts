import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { CompanyUserEntity } from '../company-user/company-user.entity';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { SupportEntity } from '../support/support.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CompanyUserEntity, SupportEntity]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
