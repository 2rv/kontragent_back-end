import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportEntity } from './support.entity';
import { UserEntity } from '../user/user.entity';
import { SupportRepository } from './support.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SupportEntity, SupportRepository]),
    AuthModule,
  ],
  controllers: [SupportController],
  providers: [SupportService],
})
export class SupportModule {}
